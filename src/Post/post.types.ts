import { Request, Response } from "express"

export interface Post {
  id: number
  title: string
  description: string
  image: string
}

export type CreatePostData = Omit<Post, "id">

export type UpdatePostData = Partial<Omit<Post, "id">>

export interface PostServiceContract {
  getAllPosts: (take?: number) => Post[]
  getPostById: (id: number) => Post | undefined
  createPost: (data: CreatePostData) => Promise<Post | null>
  updatePost: (id: number, data: UpdatePostData) => Promise<Post | null>
}



export interface PostControllerContract {

  getAll: (req: Request<void, Post[] | string, void, { take?: string }>,res: Response<Post[] | string>) => void

  getById: (req: Request<{ id: string }, Post | string>,res: Response<Post | string>) => void

  create: (req: Request<void, Post | string, CreatePostData>,res: Response<Post | string>) => Promise<void>

  update: (req: Request<{ id: string }, Post | string, UpdatePostData>,res: Response<Post | string>) => Promise<void>
}