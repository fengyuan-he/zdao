import {MDXRemote} from "next-mdx-remote";
import {serialize} from "next-mdx-remote/serialize";
import Await from "@/components/Await";
import {memo} from "react";
import "github-markdown-css";

function MDX({children}: { children: string }) {
    return (
        <Await fn={() => serialize(children)}>
            {res =>
                <article className="markdown-body" style={{background: 'transparent'}}>
                    <MDXRemote {...res}/>
                </article>
            }
        </Await>
    )
}

export default memo(MDX)