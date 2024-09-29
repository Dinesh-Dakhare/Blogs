import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import ImageTools from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

const uploadImageByUrl = async (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (err) {
      reject(err);
    }
  });
  return link.then((url) => {
    return {
      success: 1,
      file: { url: "" },
    };
  });
};
const uploadImageByFile = (e) => {

};
export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  image: {
    class: ImageTools,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByfile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [2, 3, 4],
      defaultLevel: 3,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
