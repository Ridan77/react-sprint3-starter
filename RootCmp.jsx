const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { About } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx";
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx";
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx";
import { MailEdit } from "./apps/mail/pages/MailEdit.jsx";
import { AppFooter } from "./cmps/AppFooter.jsx";

export function RootCmp() {
  return (
    <Router>
      <section className="root-cmp">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail/:mailId" element={<MailDetails />} />
          <Route path="/mail" element={<MailIndex />}>
            <Route path="/mail/edit" element={<MailEdit />} />
            <Route path="/mail/edit/:mailId" element={<MailEdit />} />
          </Route>
          <Route path="/note" element={<NoteIndex />} />
        </Routes>
        <UserMsg />
      </section>
        <AppFooter />
    </Router>
  );
}
