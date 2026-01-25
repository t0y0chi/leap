# LEAP画面設計

## 受講者側

| 画面名 | パス | 説明 |
| --- | --- | --- |
| ログイン | `/login` | Email / Password |
| 新規登録 | `/signup` | 会員登録 |
| ダッシュボード | `/dashboard` | 続きから学習・進捗サマリ |
| プロフィール | `/profile` | 名前・進捗 |
| プロフィール編集 | `/profile/edit` | 名前、Email、パスワード、アイコン画像 |
| コース一覧 | `/courses` | 受講可能コース |
| コース詳細 | `/courses/:courseId` | チャプター一覧・進捗 |
| チャプター詳細 | `/courses/:courseId/chapters/:chapterId` |  |
| チャプター詳細（学習） | `/learn/courses/:courseId/chapters/:chapterId` |  |
| 学習レッスン詳細 | `/learn/courses/:courseId/chapters/:chapterId/lessons/:lessonId` | 課題の採点が見れる |
| Q&A一覧 | `/courses/:courseId/qna` | コースQ&A |
| 通知一覧 | `/notifications` | 採点完了・お知らせ |

---

## 管理者側

| 画面名 | パス | 説明 |
| --- | --- | --- |
| 管理者ログイン | `/admin/login` | 管理者認証 |
| ダッシュボード | `/admin/dashboard` | 未採点件数・進捗 |
| コース一覧 | `/admin/courses` | コース管理 |
| コース作成 | `/admin/courses/new` | 新規作成 |
| コース編集 | `/admin/courses/:courseId/edit` | 公開設定 |
| チャプター管理 | `/admin/courses/:courseId/chapters` | CRUD・並び |
| レッスン管理 | `/admin/chapters/:chapterId/lessons` | 講義/確認テスト/提出課題 |
| 講義編集 | `/admin/lessons/:lessonId/lecture/edit` | 動画/テキスト |
| 確認問題編集 | `/admin/lessons/:lessonId/quiz/edit` | 問題・合否 |
| 提出課題編集 | `/admin/lessons/:lessonId/assignment/edit` | 課題設定 |
| 提出物一覧 | `/admin/assignments/submissions` | 全提出物 |
| 未採点一覧 | `/admin/assignments/submissions/pending` | 採点待ち |
| 提出物詳細 | `/admin/assignments/submissions/:submissionId` | 提出ファイル閲覧 |
| 採点画面 | `/admin/assignments/submissions/:submissionId/grade`  | スコア採点、画像添付、コメント |
| 採点履歴 | `/admin/assignments/submissions/:submissionId/history` | 再提出・履歴 |
| 評価 | `/admin/users/:userId/reviews/new` | 星5段階評価 |
| ユーザー一覧 | `/admin/users` | 受講者一覧。フィルターでChapter 3以降の人だけ表示とかやりたい |
| ユーザー詳細 | `/admin/users/:userId` | コース/チャプター/課題別スコア |
| 管理者招待 | `/admin/admins/invite` |  |
| 招待一覧 | `/admin/admins/invitations` |  |
| 招待受託 | `/admin/invitations/:token` |  |
