import React from 'react'
import styled from 'styled-components'
import style from './index/index.styl'
import applyStyles from 'next-style-loader/applyStyles'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const Page = () => <Title className={style.title}>My page</Title>

export default applyStyles(style)(Page)
