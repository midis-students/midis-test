import Page from "@/components/Page";
import RenderCanvas from "@/flow/render";
import React from "react";
import Header from "@/components/Header";

export default function TestPage() {
  return <>
    <Header />
    <Page>
      <RenderCanvas />
    </Page>
  </>;
}