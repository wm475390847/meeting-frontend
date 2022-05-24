import { Button, message } from 'antd'
import { Form, Modal, Input, InputNumber } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './form.module.less'
import classnames from 'classnames'
import { addCases } from '@/services/case'

type MaterialFormComponentsProps = {
  addInfo?: MaterialInfo
  gameDictList: GameDictInfo[]
  setAddInfo: React.Dispatch<React.SetStateAction<MaterialInfo | undefined>>
}

const MaterialForm: React.FC<MaterialFormComponentsProps> = (props) => {
  const { addInfo, setAddInfo, gameDictList = [] } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const gameDictName = useMemo(() => {
    if (addInfo) {
      const gameDict = (gameDictList || []).find(item => item.id === addInfo.gameDictId)

      return gameDict ? gameDict.name : '未知类别'
    }

    return undefined
  } , [addInfo])
  const schoolName = addInfo?.schoolName || '未知学校'

  const onCancel = () => {
    setVisible(false)
    setAddInfo(undefined)
  }

  const onSubmit = () => {
    form.validateFields().then(values=> {
      addCases({ ...values, materialId: addInfo!.id }).then(res => {
        if (res.success) {
          message.success('加入成功')
          onCancel()
        }
      })
    })
  }

  useEffect(() => {
    addInfo && setVisible(true)
  }, [addInfo])

  return (
    <Modal
      visible={visible}
      title='加入用例'
      footer={<Button type='primary' onClick={onSubmit}>加入用例</Button>}
      destroyOnClose
      width={510}
      onCancel={onCancel}
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
          <div>{addInfo?.score || '-'}</div>
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

export default MaterialForm