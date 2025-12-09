<script setup>
import { ref, watch, onUnmounted, useTemplateRef } from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';
import BaseLoader from '@/components/BaseLoader/BaseLoader.vue';

/**
 * Viewer to render a PDF with multiple pages.
 * Optional render with a higher resolution for zooming, e.g. in [BaseMediaCarousel](BaseMediaCarousel).
 *
 * Lifecycle and integration notes:
 * - Uses lazy-loading (via `useElementObserver`) to load only when entering the viewport.
 * - Supports pausing and resuming rendering via the exposed `stopRendering` and `resumeRendering` methods,
 *   enabling integration with parent components.
 */

defineOptions({
  name: 'BasePdfViewer',
});

const props = defineProps({
  /**
   * path or URL to the PDF file to display
   */
  src: {
    type: String,
    required: true,
  },
  /**
   * default target width (in pixels) used when zoom is disabled
   */
  initialWidth: {
    type: Number,
    default: 1000,
  },
  /**
   * whether to render pages at a higher "zoomWidth" for better detail
   */
  zoom: {
    type: Boolean,
    default: true,
  },
  /**
   * target width (in pixels) used when zoom is enabled
   */
  zoomWidth: {
    type: Number,
    default: 2500,
  },
});

const emits = defineEmits([
  /**
   * event triggered when pdfjs fails to render the PDF
   * @event error
   * @param {boolean}
   */
  'error',
  /**
   * event triggered when pdfjs lib is loaded and PDF is loaded
   * Note: needed to toggle the BaseRangeSlider in BaseMediaCarousel
   * @event initialized
   * @param {boolean}
   */
  'initialized',
]);

/**
 * reference to the container where canvas elements (PDF pages) will be inserted.
 * bound via <div ref="canvasContainer" /> in the template.
 */
const canvasContainer = useTemplateRef('canvasContainerEl');

/**
 * state of component
 * used to cancel current render tasks
 */
const mounted = ref(true);

/**
 * controls visibility of the loading spinner while fetching or rendering pages
 */
const isLoading = ref(false);

/**
 * the loaded PDF document object from pdf.js
 * null until successfully loaded
 */
let pdfDoc = null;

/**
 * tracks the current rendering version,
 * incremented to cancel obsolete rendering tasks during re-rendering
 */
const renderVersion = ref(0);

/**
 * tracks the last successfully rendered page number,
 * allowing rendering to resume from where it left off
 */
const lastRenderedPage = ref(0);

/**
 * controls page rendering
 */
const renderPagesAllowed = ref(true);

/**
 * indicates whether all PDF pages have finished rendering
 */
const allPagesRendered = ref(false);

/**
 * Dynamically imports pdf.js (and its worker) and loads the specified PDF file.
 * @param {string} src - path or URL to the PDF file
 * @returns {Promise<PDFDocumentProxy>}
 */
async function loadPdf(src) {
  const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs?url');
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
  return pdfjsLib.getDocument(src).promise;
}

/**
 * Computes the scaling factor for a PDF page based on its natural width
 * and the current zoom settings.
 * @param {number} naturalWidth - Original page width from PDF metadata.
 * @returns {number} - The scale to apply when rendering.
 */
function getScaleForPage(naturalWidth) {
  return (props.zoom ? props.zoomWidth : props.initialWidth) / naturalWidth;
}

/**
 * Renders all pages of the loaded PDF into canvas elements.
 * Cancels previously executed renderings.
 * @param {number} startPage page number to start rendering
 */
async function renderPages(startPage = 1) {
  if (!canvasContainer.value || !pdfDoc) return;

  renderVersion.value++;
  const newVersion = renderVersion.value;
  isLoading.value = true;
  allPagesRendered.value = false;

  // create empty canvases for all pages up front
  if (startPage === 1) {
    const fragment = document.createDocumentFragment();
    const canvases = Array.from({ length: pdfDoc.numPages }, () => {
      const c = document.createElement('canvas');
      c.style.marginBottom = '16px';
      return c;
    });
    canvases.forEach((canvas) => fragment.appendChild(canvas));
    canvasContainer.value.innerHTML = '';
    canvasContainer.value.appendChild(fragment);

    lastRenderedPage.value = 0;
  }

  // render each page
  for (let pageNum = startPage, n = pdfDoc.numPages; pageNum <= n; pageNum++) {
    // stop the current page rendering when a new render version is requested
    // or the component is unmounted
    // or render pages is not allowed (due external event)
    if (newVersion !== renderVersion.value || !mounted.value || !renderPagesAllowed.value) break;

    // define page properties
    const page = await pdfDoc.getPage(pageNum);
    const naturalViewport = page.getViewport({ scale: 1 });
    const scale = getScaleForPage(naturalViewport.width);
    const viewport = page.getViewport({ scale });
    const canvas = canvasContainer.value.children[pageNum - 1];
    const context = canvas.getContext('2d');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    // prepare page to render
    const task = page.render({ canvasContext: context, viewport });

    try {
      await task.promise;
      // check the renderVersion to ensure that outdated rendering loops cannot
      // overwrite the current lastRenderedPage state
      if (newVersion === renderVersion.value) lastRenderedPage.value = pageNum;
    } catch (e) {
      if (e?.name !== 'RenderingCancelledException') {
        console.error('PDF render error:', e);
        emits('error', true);
      }
    }
  }

  if (newVersion === renderVersion.value) {
    isLoading.value = false;
    renderPagesAllowed.value = false;
    allPagesRendered.value = lastRenderedPage.value >= pdfDoc.numPages;
  }
}

/**
 * Loads the PDF document and triggers rendering
 * @param {string} src - path or URL to the PDF file
 */
async function renderPdf(src) {
  if (typeof window === 'undefined' || !canvasContainer.value) return;

  isLoading.value = true;
  pdfDoc = null;

  try {
    pdfDoc = await loadPdf(src);
    emits('initialized');
    await renderPages();
  } catch (err) {
    console.error('PDF load error:', err);
    emits('error', true);
    isLoading.value = false;
  }
}

/**
 * Stops any further rendering of PDF pages
 * - Sets the `renderPagesAllowed` flag to `false` so the current render loop will exit.
 * - Any pages already rendered remain visible.
 * - The `lastRenderedPage` state is preserved so rendering can resume later.
 * - Intended for cases where the component is hidden (e.g. when the slide becomes inactive in a carousel).
 */
function stopRendering() {
  renderPagesAllowed.value = false;
}

/**
 * Resumes rendering of the remaining PDF pages.
 * - Sets the `renderPagesAllowed` flag to `true`.
 * - Skips execution if all pages have already been rendered.
 * - Calls `renderPages` starting at `lastRenderedPage + 1`, so previously rendered pages are reused.
 * - Useful when the component becomes visible again (e.g. when the slide becomes active in a carousel).
 */
function resumeRendering() {
  renderPagesAllowed.value = true;
  if (!pdfDoc || allPagesRendered.value) return;
  renderPages(lastRenderedPage.value + 1);
}

/**
 * lazy-load PDF only when it enters the viewport
 * Note: needed for usage in BaseMediaCarousel
 */
useElementObserver({
  type: 'intersection',
  target: canvasContainer,
  callback: () => {
    if (props.src) renderPdf(props.src);
  },
  options: {
    triggerCallbackWhenInViewport: true,
    stopObservingWhenInViewport: true,
  },
});

/**
 * Cancel all renders if the component unmounts
 */
onUnmounted(() => mounted.value = false);

/**
 * Reload PDF when the `src` changes (only if one is already loaded)
 */
watch(() => props.src, (newSrc) => {
  if (newSrc && pdfDoc) renderPdf(newSrc);
});

/**
 * watch for zoom changes and trigger re-render
 */
watch(() => [props.zoom, props.zoomWidth], () => {
  renderPagesAllowed.value = true;
  lastRenderedPage.value = 0;
  renderPages();
});

// With composition API we need to specifically expose variables and functions that
// should be available from outside.
defineExpose({
  /**
   * Function to stop any further rendering of PDF pages. <br>
   * The `lastRenderedPage` state is preserved so rendering can resume later.
   */
  stopRendering,
  /**
   * Function to render the remaining PDF pages.
   */
  resumeRendering,
});
</script>

<template>
  <div
    class="base-pdf-viewer"
    :style="{ '--maxWidth': `${initialWidth}px` }">
    <!-- Loader shown while PDF is loading or rendering -->
    <BaseLoader
      v-if="isLoading"
      class="base-pdf-viewer__loader" />
    <!-- Container for rendered PDF pages -->
    <div
      ref="canvasContainerEl"
      class="base-pdf-viewer__container" />
  </div>
</template>

<style lang="scss">
@use "@/styles/variables" as *;

.base-pdf-viewer {
  canvas {
    width: 100%;
    max-width: 100%;
  }
}
</style>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.base-pdf-viewer {
  height: 100%;
  min-height: 1px;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: 100%;
    max-width: var(--maxWidth);
  }
}
</style>
