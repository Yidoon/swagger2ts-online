import type { NextPage } from "next";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Editor, { Monaco } from "@monaco-editor/react";
import { Input, Tabs } from "antd";
import { EditorPanItem } from "../types";
import produce from "immer";

const { TabPane } = Tabs;

const DefaultPan = {
  name: "",
  swaggerStr: "",
  tsStr: "",
};
const genTempPanItem = (name: string) => {
  return {
    name: name,
    swaggerStr: "",
    tsStr: "",
  };
};
const Home: NextPage = () => {
  const editorRef = useRef<any>(null);
  const reviceRef = useRef<any>(null);
  const [panes, setPanes] = useState<EditorPanItem[]>([genTempPanItem("默认")]);
  const [activeKey, setActiveKey] = useState<string>("0");
  const [editKey, setEditKey] = useState<number | undefined>(undefined);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    editor.layout();
  };
  const handleSwaggerEditorChange = (val: any) => {
    setPanes(
      produce((draft) => {
        draft[+activeKey].swaggerStr = val;
      })
    );
  };
  const handleReciveEditorDidMount = (editor: any, monaco: Monaco) => {
    reviceRef.current = editor;
  };

  const transfer = async () => {
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ swaggerJsonStr: editorRef.current.getValue() }),
    }).then((res) => res.json());
    setPanes(
      produce((draft) => {
        draft[+activeKey].tsStr = res.data;
      })
    );
  };
  const onChange = (key: string) => {
    setActiveKey(key);
  };
  const onEdit = (targetKey: any, action: "add" | "remove") => {
    if (action === "add") {
      setPanes(
        produce((draft) => {
          draft.push(genTempPanItem(`Tab${panes.length + 1}`));
        })
      );
    } else {
      setPanes(
        produce((draft) => {
          draft.splice(targetKey, 1);
        })
      );
    }
  };
  const handleDoubleClick = (key: number) => {
    setEditKey(key);
  };
  const handleNameChange = (e) => {
    setPanes(
      produce((draft) => {
        draft[editKey!].name = e.target.value;
      })
    );
  };
  return (
    <div className={styles.container}>
      <Tabs
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeKey}
        tabPosition="left"
        type="editable-card"
      >
        {panes.map((item, index) => {
          const renderTabEl = () => {
            const tabName = item.name;
            const normalText = (
              <span
                style={{
                  maxWidth: 180,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                {tabName}
              </span>
            );
            const editInput = (
              <Input
                onChange={handleNameChange}
                value={tabName}
                onPressEnter={() => {
                  setEditKey(undefined);
                }}
                autoFocus
                onBlur={() => {
                  setEditKey(undefined);
                }}
              />
            );
            return (
              <div
                style={{ width: "200px" }}
                onDoubleClick={() => {
                  handleDoubleClick(index);
                }}
              >
                {editKey === index ? editInput : normalText}
              </div>
            );
          };
          return (
            <TabPane tab={renderTabEl()} key={index}>
              <div className={styles.editorWrap}>
                <div className={styles.swaggerJsonWrap}>
                  <Editor
                    height="calc(100vh - 72px)"
                    defaultLanguage="json"
                    onMount={handleEditorDidMount}
                    value={item.swaggerStr}
                    language="json"
                    onChange={handleSwaggerEditorChange}
                  />
                </div>
                <div className={styles.optBtnWrap}>
                  <button onClick={transfer} className={styles.optBtn}>
                    转换成 TS
                  </button>
                </div>
                <div className={styles.tsCodeWrap}>
                  <Editor
                    height="calc(100vh - 72px)"
                    defaultLanguage="typescript"
                    onMount={handleReciveEditorDidMount}
                    value={item.tsStr}
                    language="typescript"
                  />
                </div>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Home;
