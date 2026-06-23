import { Link } from "react-router-dom";

function CurrTabButton({ LogoIcon, to = "#", selected = false }) {
  return (
    <>
      {/* false */}
      {!selected && (
        <Link
          to={to}
          className="bg-(--bg-light) p-1 rounded-2xl border border-(--border)! hover:bg-(--bg)"
        >
          <LogoIcon className="text-(--text-semi)" size={"2rem"} />
        </Link>
      )}

      {/* true */}
      {selected && (
        <Link
          to={to}
          className="bg-(--primary) p-1 rounded-2xl border border-(--border-primary)! hover:bg-(--secondary) shadow-[0_2px_10px_var(--secondary)]"
        >
          <LogoIcon className="text-(--bg-light)" size={"2rem"} />
        </Link>
      )}
    </>
  );
}

export default CurrTabButton;
