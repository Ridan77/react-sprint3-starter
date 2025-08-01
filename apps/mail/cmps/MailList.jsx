const { useNavigate } = ReactRouterDOM;
import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({
  onRemoveMail,
  onToggleReadState,
  mails,
  onToggleStarState,
}) {
  const unReadClass = "fa-solid fa-envelope-open";
  const readClass = "fa-solid fa-envelope";
  const navigate = useNavigate();
  if (!mails.length) return <div>No Mails To Show...</div>;
  return (
    <ul>
      {mails.map((mail) => (
        <li
          key={mail.id}
          className={mail.isRead ? "read" : ""}
          onClick={() => {
            onToggleReadState(mail);
            navigate(mail.sentAt ? `/mail/${mail.id}` : `./edit/${mail.id}`);
          }}>
          {<MailPreview mail={mail} onToggleStarState={onToggleStarState} />}

          <div className="btn-container">
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                onRemoveMail(mail);
              }}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                onToggleReadState(mail);
              }}>
              <i className={mail.isRead ? readClass : unReadClass}></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
