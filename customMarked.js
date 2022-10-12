marked.use({
    gfm:true,
    breaks: true,
    tokenizer: {
        html(){},
        blockquote(){},
        fences(){},
        lheading(){},
        table(){},
        reflink(){},
        link(){},
        codespan(){},
        del(){},
        autolink(){},
    }
});