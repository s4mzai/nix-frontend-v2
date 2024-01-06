import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export const TextEditor = () => {
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
        onReady={ editor => {
            console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event ) => {
            console.log( event );
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {  
             //
            console.log( 'Focus.', editor );
        } }
    />
}