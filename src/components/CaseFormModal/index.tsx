import { Button, message } from 'antd'
import { Form, Modal, Input, InputNumber } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames'
import { addCases, editCases } from '@/services/case'
import IRootState from '@/store/interface'
import { useSelector } from 'react-redux'

type CaseFormModalComponentsProps = {
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
  }
  onCancel?: () => void
}

const CaseFormModal: React.FC<CaseFormModalComponentsProps> = (props) => {
  const { editInfo, onCancel, isEdit } = props
  // 素材类型列表
  const gameDictList = useSelector<IRootState, GameDictInfo[]>(state => state.material.gameDictList)
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const gameDictName = useMemo(() => {
    if (editInfo) {
      const gameDict = (gameDictList || []).find(item => item.id === editInfo.gameDictId)

      return gameDict ? gameDict.name : '未知类别'
    }

    return undefined
  }, [editInfo])
  const schoolName = editInfo?.schoolName || '未知学校'

  const handleCancel = () => {
    setVisible(false)
    onCancel && onCancel()
  }

  const onSubmit = () => {
    form.validateFields().then(values => {
      if (isEdit) {
        editCases({ ...values, caseId: editInfo!.id }).then(res => {
          if (res.success) {
            message.success('修改成功')
            handleCancel()
          }
        })
      } else {
        addCases({ ...values, materialId: editInfo!.id }).then(res => {
          if (res.success) {
            message.success('加入成功')
            handleCancel()
          }
        })
      }
    })
  }

  useEffect(() => {
    editInfo && setVisible(true)
  }, [editInfo])

  useEffect(() => {
    if (visible && isEdit && editInfo) {
      setTimeout(() => {
        form.setFieldsValue({
          caseDesc: editInfo.caseDesc,
          minValue: editInfo.minValue,
          maxValue: editInfo.maxValue
        })
      }, 500);
    }
  }, [visible])

  return (
    <Modal
      visible={visible}
      title={`${isEdit ? '编辑' : '加入'}用例`}
      footer={<Button type='primary' onClick={onSubmit}>{isEdit ? '确定' : '加入用例'}</Button>}
      destroyOnClose
      width={510}
      onCancel={handleCancel}
    >
      <Form
        preserve={false}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16, offset: 1 }}
        form={form}
      >
        <Form.Item label='视频来源'>
          <div>{schoolName}</div>
        </Form.Item>
        <Form.Item label='用例类别'>
          <div>{gameDictName}</div>
        </Form.Item>
        <Form.Item label='用例描述' required>
          <div className={styles.formItem}>
            <div className={styles.text}>{schoolName}&nbsp;+&nbsp;</div>
            <div className={styles.text}>{gameDictName}&nbsp;+&nbsp;</div>
            <Form.Item name='caseDesc' className={styles.inlineFormItem} rules={[{ required: true, message: '用例描述不能为空' }]}>
              <Input className={styles.input} placeholder='请输入更多用例描述' />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label='用例参考返回值'>
          <div>{editInfo?.score || '-'}</div>
        </Form.Item>
        <Form.Item label='用例返回值设置' required>
          <div className={styles.formItem}>
            <Form.Item name='minValue' className={styles.inlineFormItem} rules={[{ required: true, message: '最小值不能为空' }]}>
              <InputNumber className={classnames(styles.input, styles.textAlign)} placeholder="请输入最小值" />
            </Form.Item>
            <Input
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="~"
              disabled
            />
            <Form.Item name='maxValue' className={styles.inlineFormItem} rules={[{ required: true, message: '最大值不能为空' }]}>
              <InputNumber className={classnames(styles.input, styles.textAlign)} placeholder="请输入最大值" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label='视频预览'>
          <div className={styles.videoGroup}>
            <div className={styles.video}></div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CaseFormModal