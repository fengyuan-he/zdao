'use client'

import Swr from "@/components/Swr";
import post from "@/schema/post";
import Post from "@/components/Post";
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
import {KeyboardReturn} from "@mui/icons-material";
import create from "@/app/create";
import {useRouter} from "next/navigation";

const list = post.array()

function Page({index}: {
    index: number
}) {
    return (
        <Swr url={`/api/posts?page=${index}`} value={list}>
            {data =>
                <Stack spacing={2}>
                    {data.map(value => <Post key={value.id} {...value}/>)}
                </Stack>
            }
        </Swr>
    )
}

export default function Home() {
    const [text, setText] = useLocalStorage('text')
    const {push} = useRouter()
    const [cnt, setCnt] = useState(1)
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        首页
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Container sx={{my: 3}}>
                <Stack spacing={2} divider={<Divider/>}>
                    <TextField
                        label="创建帖子"
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
                                            push(`/post/${await create('/api/posts', {
                                                method: 'POST',
                                                body: text
                                            })}`)
                                            setText('')
                                        }}>
                                            <KeyboardReturn/>
                                        </IconButton>
                                    </InputAdornment>
                            }
                        }}
                    />
                    {new Array(cnt).map((_, index) => <Page index={index} key={index}/>)}
                    <Button onClick={() => setCnt(cnt + 1)}>
                        加载更多
                    </Button>
                </Stack>
            </Container>
        </>
    )
}