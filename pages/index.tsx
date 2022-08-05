import type { NextPage } from "next";
import { ChangeEvent, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Editor, { Monaco } from "@monaco-editor/react";
import { Input, message, Spin, Tabs } from "antd";
import { EditorPanItem } from "../types";
import produce from "immer";
import LinkToGithub from "./components/LinkToGithub";

const { TabPane } = Tabs;
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
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ swaggerJsonStr: editorRef.current.getValue() }),
    }).then((res) => res.json());
    if (res.code !== 200) {
      message.error(res.msg);
    } else {
      setPanes(
        produce((draft) => {
          draft[+activeKey].tsStr = res.data;
        })
      );
    }
    setLoading(false);
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
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPanes(
      produce((draft) => {
        draft[editKey!].name = e.target.value;
      })
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LinkToGithub />
      </div>
      <div className={styles.content}>
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
                    <Spin spinning={loading}>
                      <Editor
                        height="calc(100vh - 72px)"
                        defaultLanguage="typescript"
                        onMount={handleReciveEditorDidMount}
                        value={item.tsStr}
                        language="typescript"
                      />
                    </Spin>
                  </div>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
