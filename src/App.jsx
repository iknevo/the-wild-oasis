import isPropValid from "@emotion/is-prop-valid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Router from "./Routes.jsx";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
  DefaultOptions: {
    queries: { staleTime: 0 },
  },
});

function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    return isPropValid(propName);
  }
  return true;
}

export default function App() {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <RouterProvider router={Router} />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3 * 1000,
              },
              error: {
                duration: 5 * 1000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </StyleSheetManager>
  );
}
