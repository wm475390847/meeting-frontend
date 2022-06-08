import { Button, message } from 'antd'
import { Form, Modal, Input, InputNumber } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames'
import { addCase, editCase } from '@/services/case'
import IRootState from '@/store/interface'
import { useSelector } from 'react-redux'

type TaskFormModalComponentsProps = {
  isEdit?: boolean
  editInfo?: {
    gameDictId?: number
    schoolName?: string
    id?: number
    score?: string
    // 编辑字段
    caseDesc?: string
    minValue?: string
    maxValue?: string
  },
  onCancel?: () => void
}
