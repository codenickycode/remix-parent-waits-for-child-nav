import { Await, defer, useLoaderData, useNavigation } from "@remix-run/react";
import { Suspense } from "react";

export const loader = async () => {
  return defer({
    prom: new Promise((res) => setTimeout(() => res(null), 2000)),
  });
};

export default function Child() {
  const { prom } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  return (
    <div className="mt-6 text-xl">
      <Suspense fallback={<h1>child loading...</h1>}>
        <Await resolve={prom}>
          {() => {
            return (
              <h1>
                {navigation.state === "loading"
                  ? "child loading..."
                  : "loaded!"}
              </h1>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
