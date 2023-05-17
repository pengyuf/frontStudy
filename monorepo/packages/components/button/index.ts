import {withNoopInstall,withInstall} from '@cobyte-ui/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

export const ElButton = withInstall(Button,{
    ButtonGroup
})
export default ElButton;
export const ElButtonGroup = withNoopInstall(ButtonGroup)
export * from "./src/button";