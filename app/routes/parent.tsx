import { json, Link, Outlet, useParams } from "@remix-run/react";
import { ReactNode } from "react";

export const loader = async () => {
  return json({ ok: true });
};

export default function Parent() {
  const { childId = "" } = useParams();
  return (
    <div className="p-8 w-64">
      <Link to="./child1">
        <P id="child1" activeId={childId}>
          child 1
        </P>
      </Link>
      <Link to="./child2">
        <P id="child2" activeId={childId}>
          child 2
        </P>
      </Link>
      <Outlet />
    </div>
  );
}

const P = ({
  id,
  activeId,
  children,
}: {
  id: string;
  activeId: string;
  children: ReactNode;
}) => {
  const isActive = id === activeId;
  if (isActive) {
    console.log(`${id} is active`);
  }
  return (
    <p
      className={
        (isActive ? "bg-blue-500" : "border-gray-500") +
        " p-4 text-xl border cursor-pointer"
      }
    >
      {children}
    </p>
  );
};
