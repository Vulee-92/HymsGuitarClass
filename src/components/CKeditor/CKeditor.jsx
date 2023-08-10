import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ data, setData, config = {}, height = "200px" }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={config}
            data={data}
            onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
            }}
            onReady={(editor) => {
                editor.editing.view.change((writer) => {
                    writer.setStyle(
                        "height",
                        height,
                        editor.editing.view.document.getRoot()
                    );
                });
            }}
        />
    );
};

export default Editor;