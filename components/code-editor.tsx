"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor, { loader } from "@monaco-editor/react";
import { Cog } from "lucide-react";
import { useTheme } from "next-themes";

export function CodeEditor() {
  const { theme: mainTheme } = useTheme();
  const [language, setLanguage] = useState("javascript");

  const [theme, setTheme] = useState(mainTheme === "dark" ? "vs-dark" : "");

  useEffect(() => {
    setTheme(mainTheme === "dark" ? "vs-dark" : "vs-light");
  }, [mainTheme]);

  const [showConfig, setShowConfig] = useState(true);
  console.log(mainTheme);

  const editorRef = useRef(null);
  const statusBarRef = useRef(null);
  const problemStatement = `
    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

    You may assume that each input would have exactly one solution, and you may not use the same element twice.

    You can return the answer in any order.

    Example 1:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

    Example 2:
    Input: nums = [3,2,4], target = 6
    Output: [1,2]

    Example 3:
    Input: nums = [3,3], target = 6
    Output: [0,1]
  `;

  const initialCode = `function twoSum(nums, target) {
  // Your code here
}`;

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    if (editorRef.current) {
      //const vimMode = initVimMode(editorRef.current, statusBarRef.current);
    }
  }

  return (
    <div className="flex h-screen ">
      {/* Problem Statement Column */}
      <div className="w-1/3 p-4  overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Problem: Two Sum</h2>
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {problemStatement}
        </pre>
      </div>

      {/* Code Editor Column */}
      <div className="w-2/3 flex flex-col">
        <div
          className={`p-2 flex justify-between items-center ${mainTheme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
        >
          {showConfig && (
            <div className="flex space-x-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vs-dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button>Run Code</Button>
        </div>
        <Editor
          height="calc(100vh - 48px)"
          defaultLanguage={language}
          language={language}
          defaultValue={initialCode}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          onMount={handleEditorDidMount}
        />
        <div
          ref={statusBarRef}
          className={`bg-gray-900 text-white p-2 text-sm ${mainTheme === "dark" ? "text-white" : "text-black"}`}
        ></div>

        <Button variant="ghost" onClick={() => setShowConfig(!showConfig)}>
          <Cog className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
