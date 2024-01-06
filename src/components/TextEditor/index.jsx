import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import './index.css';

export const TextEditor = (value, onChange) => {
    return <CKEditor
        editor={ ClassicEditor }
        config={{
            toolbar: [
                'undo', 'redo', '|', 'heading', '|',
                'bold', 'italic', 'link',
                'bulletedList', 'numberedList', 'blockQuote'
            ],
            placeholder: "Type your content here."
        }}  
        data={value}
        onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
        }}
        
        onReady={ editor => {
            console.log( 'Editor is ready to use!', editor );
            //editor.ui.view.editable.element.style.minHeight = "150px";
        }}
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {  
             //
            console.log( 'Focus.', editor );
        } }
    />
}