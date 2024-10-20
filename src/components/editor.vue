<template>
    <ckeditor v-model="editorData" :editor="ClassicEditor" :config="editorConfig" @input="handleChange" />
</template>
<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import {
        DecoupledEditor,
        ClassicEditor,
        Bold,
        Essentials,
        Italic,
        Mention,
        Paragraph,
        Undo,
        Heading,
        FontFamily,
        FontSize,
        FontColor,
        FontBackgroundColor,
        Strikethrough,
        Subscript,
        Code,
        Link,
        BlockQuote,
        CodeBlock,
        TodoList,
        Indent,
        Image, // 导入 Image 插件
        ImageToolbar, // 导入 ImageToolbar 插件
        ImageUpload, // 导入 ImageUpload 插件
        Superscript, // 导入 Superscript 插件
        Base64UploadAdapter,
    } from 'ckeditor5';
    import 'ckeditor5/ckeditor5.css';

    const editor = ref(ClassicEditor);
    const editorData = ref('');
    const editorConfig = ref({
        extraPlugins: [Base64UploadAdapter],
        plugins: [
            Bold,
            Essentials,
            Italic,
            Mention,
            Paragraph,
            Undo,
            Heading,
            FontFamily,
            FontSize,
            FontColor,
            FontBackgroundColor,
            Strikethrough,
            Subscript,
            Code,
            Link,
            BlockQuote,
            CodeBlock,
            TodoList,
            Indent,
            Image, // 添加 Image 插件
            ImageToolbar, // 添加 ImageToolbar 插件
            ImageUpload, // 添加 ImageUpload 插件
            Superscript // 添加 Superscript 插件
        ],
        toolbar: {
            items: [
                'undo', 'redo',
                '|',
                'heading',
                '|',
                'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                '|',
                'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                '|',
                'link', 'uploadImage', 'blockQuote', 'codeBlock',
                '|',
                'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent'
            ],
            shouldNotGroupWhenFull: true
        },
    });

    const emit = defineEmits(['update:modelValue']);

    const handleChange = () => {
        emit('update:modelValue', editorData.value);
    };
</script>

<style>
    .ck-editor__editable_inline {
        max-height: 600px;
        overflow-y: auto;
    }
</style>