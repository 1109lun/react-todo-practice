# React To-Do List Practice

這是一個使用 **React** 重構的 To-Do List 應用，延續練習二的功能，並加入呼叫第三方 API 的新特性。  

---

## 🔧 技術與工具

- **前端框架**：React (Vite)
- **資料管理**：React State 
- **任務屬性**：
  - 標題（title）
  - 說明（description）
  - 到期日（dueDate）
  - 優先順序（priority）
  - 是否完成（completed）
- **API 整合**：[Bored API](https://www.boredapi.com/api/activity)  
  - 一鍵「我好無聊」即可自動建立任務
- **版本控制**：Git + GitHub

---

## 📦 主要功能

- [x] 支援多個專案建立與切換
- [x] 可在每個專案下新增 / 刪除任務
- [x] 切換任務完成狀態
- [x] 任務列表依照優先度排序
- [x] 點擊「我好無聊」從 API 隨機取得活動並新增為任務
- [x] 使用 `<dialog>` 元素建立彈出視窗（新增任務表單）
- [x] 完整使用 React Hooks、props 傳遞與 component 拆分

---

## 🚀 使用方式（開發環境）

```bash
git clone https://github.com/1109lun/react-todo-practice.git
cd react-todo-practice
npm install
npm run dev
