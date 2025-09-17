<script setup>
import { ref, watch, onUnmounted, useTemplateRef } from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';
import BaseLoader from '@/components/BaseLoader/BaseLoader.vue';

/**
 * Viewer to render a PDF with multiple pages.
 * Optional render with a higher resolution for zooming, e.g. in [BaseMediaCarousel](BaseMediaCarousel)
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
 * controls visibility of the loading spinner while fetching or rendering pages
 */
const isLoading = ref(false);

/**
 * the loaded PDF document object from pdf.js
 * null until successfully loaded
 */
let pdfDoc = null;

/**
 * tracks the latest rendering version.
 * increased to cancel obsolete rendering tasks when re-rendering
 */
let renderVersion = 0;

/**
 * list of currently running PDF render tasks.
 * used to cancel them before starting a new render pass.
 */
let activeRenderTasks = [];

/**
 * cancels all currently active render tasks.
 * prevents race conditions where pages render out of order
 */
function cancelActiveRenderTasks() {
  for (let i = 0; i < activeRenderTasks.length; i++) {
    activeRenderTasks[i].cancel();
  }
  activeRenderTasks = [];
}

/**
 * dynamically imports pdf.js (and its worker) and loads the specified PDF file.
 * @param {string} src - path or URL to the PDF file
 * @returns {Promise<PDFDocumentProxy>}
 */
async function loadPdf(src) {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const pdfjsWorker = await import('pdfjs-dist/legacy/build/pdf.worker.mjs?url');
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
  return pdfjsLib.getDocument(src).promise;
}

/**
 * computes the scaling factor for a PDF page based on its natural width
 * and the current zoom settings
 * @param {number} naturalWidth - Original page width from PDF metadata.
 * @returns {number} - The scale to apply when rendering.
 */
function getScaleForPage(naturalWidth) {
  return (props.zoom ? props.zoomWidth : props.initialWidth) / naturalWidth;
}

/**
 * renders all pages of the loaded PDF into canvas elements.
 * cancels previously executed renderings.
 */
async function renderPages() {
  if (!canvasContainer.value || !pdfDoc) return;

  const newVersion = ++renderVersion;
  cancelActiveRenderTasks();
  isLoading.value = true;

  // create empty canvases for all pages up front
  const fragment = document.createDocumentFragment();
  const canvases = Array.from({ length: pdfDoc.numPages }, () => {
    const c = document.createElement('canvas');
    c.style.marginBottom = '16px';
    return c;
  });
  canvases.forEach(c => fragment.appendChild(c));

  if (newVersion !== renderVersion) return;
  canvasContainer.value.innerHTML = '';
  canvasContainer.value.appendChild(fragment);

  // render each page
  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    if (newVersion !== renderVersion) break;

    const page = await pdfDoc.getPage(pageNum);
    const naturalViewport = page.getViewport({ scale: 1 });
    const scale = getScaleForPage(naturalViewport.width);
    const viewport = page.getViewport({ scale });

    const canvas = canvases[pageNum - 1];
    const context = canvas.getContext('2d');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    const task = page.render({ canvasContext: context, viewport });
    activeRenderTasks.push(task);

    try {
      await task.promise;
    } catch (e) {
      if (e?.name !== 'RenderingCancelledException') {
        console.error('PDF render error:', e);
        emits('error', true);
      }
    }
  }

  if (newVersion === renderVersion) {
    isLoading.value = false;
  }
}

/**
 * loads the PDF document and triggers rendering
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
 * cancel all renders if the component unmounts
 */
onUnmounted(cancelActiveRenderTasks);

/**
 * reload PDF when the `src` changes (only if one is already loaded)
 */
watch(() => props.src, (newSrc) => {
  if (newSrc && pdfDoc) renderPdf(newSrc);
});

/**
 * watch for zoom changes and trigger re-render
 */
watch(() => [props.zoom, props.zoomWidth], renderPages, { immediate: true });
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
