import { Link, Tool } from "@/scripts/Utils/ParseExtensionsXML";
import React from "react";

export function AwesomeArcadeTool({
  tool,
  pad,
}: {
  tool: Tool;
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={`card ${pad ? "mb-2" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{tool.title}</h5>
        <h6 className="card-subtitle mb-2 ttool-body-secondary">
          Made by{" "}
          <a
            href={`https://github.com/${tool.author}`}
            target="_blank"
            rel="noopener noreferer"
          >
            {tool.author}
          </a>
        </h6>
        <>
          Access this tool at:
          <blockquote className="border-start border-secondary border-2 ps-3 mt-1 mb-2">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              {tool.url}
            </a>
          </blockquote>
        </>
        <div
          className="card-ttool"
          dangerouslySetInnerHTML={{ __html: tool.description }}
        />
        {tool.links.map((link: Link) => {
          return (
            <a
              href={link.url}
              key={link.url}
              className="card-link"
              target="_blank"
              rel="noopener noreferer"
            >
              {link.label != undefined ? link.label : link.url}
            </a>
          );
        })}
        {tool.forks != undefined && tool.forks.length > 0 ? (
          <AwesomeArcadeToolGroup
            description={
              <p className="mt-3">
                There {tool.forks.length === 1 ? "is" : "are"}{" "}
                <b>{tool.forks.length}</b> fork
                {tool.forks.length !== 1 ? "s" : undefined} available!
              </p>
            }
            tools={tool.forks}
            pad={false}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export function AwesomeArcadeToolGroup({
  title,
  description,
  tools,
  pad,
}: {
  title?: JSX.Element | undefined;
  description?: JSX.Element | undefined;
  tools: Tool[];
  pad?: boolean | undefined;
}): JSX.Element {
  return (
    <div className={pad == undefined || pad ? "mb-3" : ""}>
      {title}
      {description}
      {tools.map((tool, i) => {
        return (
          <AwesomeArcadeTool
            key={tool.repo}
            tool={tool}
            pad={i < tools.length - 1}
          />
        );
      })}
    </div>
  );
}