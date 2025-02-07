'use client'

import Swr from "@/components/Swr";
import Comment from "@/components/Comment";
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
import comment from "@/schema/comment";
import Post from "@/components/Post";
import postWithoutId from "@/schema/postWithoutId";

const list = comment.array()

function Page({id, index}: {
    id: number
    index: number
}) {
    return (
        <Swr url={`/api/comments?postId=${id}&page=${index}`} value={list}>
            {data =>
                <Stack spacing={2}>
                    {data.map(value => <Comment key={value.id} {...value}/>)}
                </Stack>
            }
        </Swr>
    )
}

export default function Comments({id}: {
    id: number
}) {
    const [text, setText] = useLocalStorage(`>${id}-text`)
    const [cnt, setCnt] = useState(1)
    return (
        <>
            <title>
                {`>${id}|${process.env.NEXT_PUBLIC_TITLE}`}
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
                        {`>${id}`}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Container sx={{my: 3}}>
                <Stack spacing={2} divider={<Divider/>}>
                    <Swr url={`/api/posts/${id}`} value={postWithoutId}>
                        {data =>
                            <Post {...data}/>
                        }
                    </Swr>
                    <TextField
                        label="创建评论"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={async () => {
                                            await create(`/api/comments?postId=${id}`, {
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
                    {Array.from({length: cnt}).map((_, index) => <Page id={id} index={index} key={index}/>)}
                    <Button onClick={() => setCnt(cnt + 1)}>
                        加载更多
                    </Button>
                </Stack>
            </Container>
        </>
    )
}