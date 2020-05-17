import React from 'react'
import { CodeBlock, dracula } from 'react-code-blocks'

type RProps = {
  code: string
}

export const ResponseCodeBlock: React.FC<RProps> = ({ code }) => (
  <CodeBlock
    text={code}
    language="javascript"
    theme={dracula}
    showLineNumbers
    wrapLines
  />
)
