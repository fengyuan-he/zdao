'use client'

import Swr from "@/components/Swr";
import {useState} from "react";
import {
    AppBar,
    Button,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage";
import {Home, KeyboardReturn} from "@mui/icons-material";
import create from "@/app/create";
import Post from "@/components/Post";
import Comment from "@/components/Comment";
import Await from "@/components/Await";
import review from "@/review";
import MDX from "@/components/MDX";
import Corner from "@/components/Corner";
import reply from "@/schema/reply";
import {replyMax} from "@/schema/replyText";
import Reply from "@/components/Reply";
import commentWithoutId from "@/schema/commentWithoutId";

const list = reply.array()

function Page({id, index}: {
    id: number
    index: number
}) {
    return (
        <Swr url={`/api/replies/list?commentId=${id}&page=${index}`} value={list}>
            {data =>
                <Stack spacing={2}>
                    {data.map(value => <Reply key={value.id} {...value}/>)}
                </Stack>
            }
        </Swr>
    )
}

export default function Comments({id}: {
    id: number
}) {
    const [text, setText] = useLocalStorage(`#${id}-text`)
    const [cnt, setCnt] = useState(1)
    return (
        <>
            <title>
                {`#${id}|${process.env.NEXT_PUBLIC_TITLE}`}
            </title>
            <AppBar>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{mr: 2}}
                        onClick={() => location.href = '/'}
                    >
                        <Home/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {`#${id}`}
                    </Typography>
                    <Corner/>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Container sx={{my: 3}}>
                <Stack spacing={2} divider={<Divider/>}>
                    <Swr url={`/api/comments/${id}`} value={commentWithoutId}>
                        {({Post: postData, ...data}) =>
                            <>
                                <Post {...postData}/>
                                <Comment {...data}/>
                            </>
                        }
                    </Swr>
                    <TextField
                        label="创建回复"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        error={text.length > replyMax}
                        helperText={`${text.length}/${replyMax}`}
                        slotProps={{
                            input: {
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={async () => {
                                            await create(`/api/replies?commentId=${id}`, {
                                                method: 'POST',
                                                body: text
                                            })
                                            location.reload()
                                            setText('')
                                        }}>
                                            <KeyboardReturn/>
                                        </IconButton>
                                    </InputAdornment>
                            }
                        }}
                    />
                    <Await fn={() => review(text)}>
                        {res => <MDX>{res}</MDX>}
                    </Await>
                    {Array.from({length: cnt}).map((_, index) => <Page id={id} index={index} key={index}/>)}
                    <Button onClick={() => setCnt(cnt + 1)}>
                        加载更多
                    </Button>
                </Stack>
            </Container>
        </>
    )
}