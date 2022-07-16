import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import RichEditor from "./components/RichEditor";
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
    console.log(editorRef.current.getValue());
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ swaggerJsonStr: editorRef.current.getValue() }),
    }).then((res) => res.json());
    setTransferValue(res.data);
    console.log(res.data, "ress");
  };
  return (
    <div className={styles.container}>
      <div className={styles.swaggerJsonWrap}>
        <Editor
          height="100vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
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
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleReciveEditorDidMount}
          value={transerValue}
        />
      </div>
    </div>
  );
};

export default Home;
