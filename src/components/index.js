import { defineAsyncComponent } from 'vue';

import BaseLoader from '@/components/BaseLoader/BaseLoader.vue';
import BaseTooltipBox from '@/components/BaseTooltipBox/BaseTooltipBox.vue';
import BaseImage from '@/components/BaseImage/BaseImage.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseDropDownList from '@/components/BaseDropDownList/BaseDropDownList.vue';
import BaseAutocompleteInput from '@/components/BaseAutocompleteInput/BaseAutocompleteInput.vue';
import BaseBox from '@/components/BaseBox/BaseBox.vue';
import BaseSwitchButton from '@/components/BaseSwitchButton/BaseSwitchButton.vue';
import BasePopUp from '@/components/BasePopUp/BasePopUp.vue';
import BaseProgressBar from '@/components/BaseProgressBar/BaseProgressBar.vue';
import BaseDropDown from '@/components/BaseDropDown/BaseDropDown.vue';
import BaseUploadPopUp from '@/components/BaseUploadPopUp/BaseUploadPopUp.vue';
import BaseToggle from '@/components/BaseToggle/BaseToggle.vue';
import BaseSelectOptions from '@/components/BaseSelectOptions/BaseSelectOptions.vue';
import BaseImageGrid from '@/components/BaseImageGrid/BaseImageGrid.vue';
import BaseImageBox from '@/components/BaseImageBox/BaseImageBox.vue';
import BaseChip from '@/components/BaseChip/BaseChip.vue';
import BaseChipsInputField from '@/components/BaseChipsInputField/BaseChipsInputField.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import BaseChipsInput from '@/components/BaseChipsInput/BaseChipsInput.vue';
import BaseBoxButton from '@/components/BaseBoxButton/BaseBoxButton.vue';
import BaseLink from '@/components/BaseLink/BaseLink.vue';
import BaseBreadCrumbs from '@/components/BaseBreadCrumbs/BaseBreadCrumbs.vue';
import BaseNavigation from '@/components/BaseNavigation/BaseNavigation.vue';
import BaseCheckmark from '@/components/BaseCheckmark/BaseCheckmark.vue';
import BaseCarousel from '@/components/BaseCarousel/BaseCarousel.vue';
import BaseChipsBelow from '@/components/BaseChipsBelow/BaseChipsBelow.vue';
import BaseDetailBox from '@/components/BaseDetailBox/BaseDetailBox.vue';
import BaseDropBox from '@/components/BaseDropBox/BaseDropBox.vue';
import BaseDropButton from '@/components/BaseDropButton/BaseDropButton.vue';
import BaseEditControl from '@/components/BaseEditControl/BaseEditControl.vue';
import BaseMultilineTextInput from '@/components/BaseMultilineTextInput/BaseMultilineTextInput.vue';
import BaseMenuEntry from '@/components/BaseMenuEntry/BaseMenuEntry.vue';
import BaseMenuList from '@/components/BaseMenuList/BaseMenuList.vue';
import BaseEntrySelector from '@/components/BaseEntrySelector/BaseEntrySelector.vue';
import BasePagination from '@/components/BasePagination/BasePagination.vue';
import BaseOptions from '@/components/BaseOptions/BaseOptions.vue';
import BaseTextList from '@/components/BaseTextList/BaseTextList.vue';
import BaseResultBoxSection from '@/components/BaseResultBoxSection/BaseResultBoxSection.vue';
import BaseMediaCarousel from '@/components/BaseMediaCarousel/BaseMediaCarousel.vue';
import BaseIcon from './BaseIcon/BaseIcon.vue';
import BaseInfoPanel from './BaseInfoPanel/BaseInfoPanel.vue';
import BaseButton from './BaseButton/BaseButton.vue';
import BaseMap from './BaseMap/BaseMap.vue';
import BaseMapLocations from './BaseMapLocations/BaseMapLocations.vue';
import BaseExpandBox from './BaseExpandBox/BaseExpandBox.vue';
import BaseBoxTooltip from './BaseBoxTooltip/BaseBoxTooltip.vue';
// importing BaseDateInput async to avoid SSR problems!
const BaseDateInput = defineAsyncComponent(() => import('@/components/BaseDateInput/BaseDateInput.vue'));
// import BaseHlsVideo from '@/components/BaseHlsVideo/BaseHlsVideo.vue';
const BaseHlsVideo = defineAsyncComponent(() => import('@/components/BaseHlsVideo/BaseHlsVideo.vue'));

export {
  BaseButton,
  BaseIcon,
  BaseLoader,
  BaseTooltipBox,
  BaseImage,
  BaseInput,
  BaseInfoPanel,
  BaseDropDownList,
  BaseAutocompleteInput,
  BaseBox,
  BaseSwitchButton,
  BaseDateInput,
  BasePopUp,
  BaseProgressBar,
  BaseDropDown,
  BaseUploadPopUp,
  BaseToggle,
  BaseSelectOptions,
  BaseImageGrid,
  BaseImageBox,
  BaseChip,
  BaseChipsInputField,
  BaseSearch,
  BaseChipsInput,
  BaseBoxButton,
  BaseLink,
  BaseBreadCrumbs,
  BaseNavigation,
  BaseCheckmark,
  BaseCarousel,
  BaseChipsBelow,
  BaseDetailBox,
  BaseDropBox,
  BaseDropButton,
  BaseEditControl,
  BaseHlsVideo,
  BaseMultilineTextInput,
  BaseMenuEntry,
  BaseMenuList,
  BaseEntrySelector,
  BasePagination,
  BaseOptions,
  BaseTextList,
  BaseResultBoxSection,
  BaseMediaCarousel,
  BaseMap,
  BaseMapLocations,
  BaseExpandBox,
  BaseBoxTooltip,
};
