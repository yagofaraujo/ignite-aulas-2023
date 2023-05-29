import { Slug } from "./value-objects/slug"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/value-objects/unique-entity-id"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"

interface QuestionProps { 
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    const THREE_DAYS = 3

    return dayjs().diff(this.createdAt, 'days') <= THREE_DAYS
  }

  get excerpt() {
    return this.content
      .substring(0, 120)
      .trimEnd()
      .concat('...')
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId (bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId 
    this.touch()
  }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityId) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
      slug: props.slug ?? Slug.createFromText(props.title)
    }, id)

    return question
  }
}