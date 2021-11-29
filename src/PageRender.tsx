import React from 'react'
import { useParams } from 'react-router'
import { IParams } from './types'

const generatePage = (name: string) => {
  const page = () => require(`./pages/${name}`).default

  try {
    return React.createElement(page())
  } catch (error) {
    return <h2>Not Found</h2>
  }
}

const PageRender = () => {
  const { page, id }: IParams = useParams()

  let name = ''

  if (page) {
    name = id ? `${page}/[id]` : `${page}`
  }
  return generatePage(name)
}

export default PageRender
