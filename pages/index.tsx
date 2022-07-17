import type { NextPage } from "next";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Editor, { Monaco } from "@monaco-editor/react";

const Home: NextPage = () => {
  const editorRef = useRef<any>(null);
  const reviceRef = useRef<any>(null);
  const [transerValue, setTransferValue] = useState<string>("");
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
  };
  const handleReciveEditorDidMount = (editor: any, monaco: Monaco) => {
    reviceRef.current = editor;
  };
  const transer = async () => {
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ swaggerJsonStr: editorRef.current.getValue() }),
    }).then((res) => res.json());
    setTransferValue(res.data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.swaggerJsonWrap}>
        <Editor
          height="100vh"
          defaultLanguage="json"
          onMount={handleEditorDidMount}
          language="json"
        />
      </div>
      <div className={styles.optBtnWrap}>
        <button onClick={transer} className={styles.optBtn}>
          转换
        </button>
      </div>
      <div className={styles.tsCodeWrap}>
        <Editor
          height="100vh"
          defaultLanguage="typescript"
          onMount={handleReciveEditorDidMount}
          value={transerValue}
          language="typescript"
        />
      </div>
    </div>
  );
};

export default Home;
