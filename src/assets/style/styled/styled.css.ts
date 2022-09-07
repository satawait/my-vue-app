// styled.css.ts
import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

export const todoList = style({
  marginTop: '20px',
  backgroundColor: vars.colors.backgroundColor,
  color: vars.colors.color
})

export const todoInfo = style({
  paddingTop: '10px',
  // 伪类选择器
  ':hover': {
    color: 'red'
  },
  selectors: {
    // 选择自身的最后一个元素
    '&:last-child': {
      paddingBottom: '10px'
    },
    // 选择器还可以包含对其他作用域类名称的引用，这会改变 todoList 这个类的背景颜色
    [`${todoList} &`]: {
      background: 'yellow'
    }
  },
  // 媒体查询
  '@media': {
    'screen and (min-width: 568px)': {
      color: 'blue'
    }
  },
  '@supports': {
    // 摘自官网示例
    '(display: grid)': {
      display: 'grid'
    }
  }
})
// 对局部作用类名的样式设置
globalStyle(`${todoList} > li`, {
  color: 'green !important'
})
// 样式组合
const base = style({ padding: 12 })
export const primary = style([base, { background: 'blue' }])
export const secondary = style([base, { background: 'aqua' }])
