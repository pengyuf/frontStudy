<template>
    <div class="upload-box">
        <template v-if="uploadType == 'xlsx'">
            <div class="input-box">
                上传
                <input type="file" @input="inputChange" />
            </div>
            <div class="file-name-box" v-show="curFile">
                <span class="title">{{ fileName }}</span>
                <span class="iconfont icon-shanchu del-icon" @click="delFile"></span>
            </div>
        </template>
        <template v-if="uploadType == 'img'">
            <div class="img-input-box">
                <div class="iconfont icon-tianjia add-icon" v-show="!curFile"></div>
                <input type="file" @input="inputChange" v-show="!curFile" />
                <img class="preview-img" v-show="imgPreviewSrc" :src="imgPreviewSrc" />
                <div class="img-mask-box" v-show="curFile">
                    <span class="iconfont icon-fangda"></span>
                    <span class="iconfont icon-shanchu" @click="delFile"></span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, getCurrentInstance, computed, watch } from 'vue'

const props = defineProps({
    uploadType: {
        type: String,
        default: 'img'
    }
})

const curFile = ref(null)
const imgPreviewSrc = ref('')
const fileName = ref('')

watch(curFile, (newFile) => {
    if (newFile) {
        getFileName(newFile)
        localImgToBase64(newFile)
    }
})

function inputChange(e) {
    console.log(e)
    const file = e.target.files[0]
    if (checkFileType(file.type)) {
        curFile.value = file
    } else {
        alert(`请上传${props.uploadType}文件`)
    }
}

function delFile() {
    curFile.value = null
    imgPreviewSrc.value = ''
}

function checkFileType(curType) {
    let uploadType = props.uploadType
    if (uploadType == 'xlsx') {
        return curType.indexOf('sheet') !== -1 ? true : false
    }
    if (uploadType == 'img') {
        return curType.indexOf('image') !== -1 ? true : false
    }
}

// 本地图片转base64
function localImgToBase64(file) {
    if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            imgPreviewSrc.value = reader.result
        }
    }
}

// 文件名称
function getFileName(file) {
    file ? fileName.value = file.name : ''
}

</script>

<style scoped>
.upload-box {
    cursor: pointer;
}

.input-box {
    background: #f0f0f0;
    width: 100px;
    height: 50px;
    line-height: 50px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
}

.input-box input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
}

.file-name-box {
    margin-top: 10px;
}

.file-name-box .del-icon {
    display: inline-block;
    margin-left: 6px;
}

.img-input-box {
    width: 140px;
    height: 140px;
    line-height: 140px;
    border: 1px solid #999;
    border-radius: 6px;
    position: relative;
}

.img-input-box input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
}

.img-input-box .add-icon {
    font-size: 40px;
    color: #999;
}

.img-mask-box {
    background: rgba(0, 0, 0, .6);
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    opacity: 0;
}

.img-mask-box:hover {
    opacity: 1;
}

.img-mask-box .iconfont {
    font-size: 30px;
    flex: 1;
}

.preview-img {
    width: 140px;
    height: 140px;
}
</style>