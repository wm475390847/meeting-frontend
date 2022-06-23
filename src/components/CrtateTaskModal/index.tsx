import { getGameDict } from '@/services/material';
import { createTask } from '@/services/task';
import { Button, Checkbox, Form, Input, message, Modal, Radio, RadioChangeEvent, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less'

type CreateTaskModalComponentsProps = {
  visible: boolean
  onCancel?: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface Option {
  label: string
  value: number
}

const CreateTaskModal: React.FC<CreateTaskModalComponentsProps> = (props) => {
  const { visible, onCancel, setLoading } = props
  const [value, setValue] = useState();
  const [gameDictList, setGameDictList] = useState<Option[]>([])
  const [gameDictIdList, setGameDictIdList] = useState<number[]>([])
  const [taskName, setTaskName] = useState<string>()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [form] = Form.useForm()

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  /**
   * 关闭弹窗，父组件传入onCancel(setVisible=false)
   */
  const handleCancel = () => {
    onCancel && onCancel()
  }

  const onSubmit = () => {
    form.validateFields().then(values => {
      setButtonLoading(true)
      createTask({
        gameDictIds: value === 1 ? gameDictList.map(item => item.value) : gameDictIdList,
        taskName: taskName
      }).then(res => {
        message.success(res.message)
        setLoading(true)
        handleCancel()
      }).catch(err => {
        message.error(err.message)
      }).finally(() => setButtonLoading(false))
    })
  }

  useEffect(() => {
    value && setGameDictIdList([])
    setTaskName(undefined)
  }, [value])

  useEffect(() => {
    // 获取到gameDict接口返回内容
    visible && getGameDict().then(res => {
      const map = res.map(element => {
        return {
          // 将名称和id赋值给Option
          label: element.name,
          value: element.id
        }
      })
      // 放入opations
      setGameDictList(map)
    })
  }, [visible])

  return (
    <>
      <Modal className={styles.modal}
        title="请选择一种方式创建"
        visible={visible}
        footer={<Button loading={buttonLoading} onClick={() => onSubmit()}>确定</Button>}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} className={styles.formItem}>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio className={styles.radio} value={1}>所有用例创建 {value === 1 &&
                <Form.Item label='任务名称' name='taskName' className={styles.inlineFormItem} rules={[{ required: true, message: '任务名称不能为空' }]}>
                  <Input onChange={e => setTaskName(e.target.value)} className={styles.input} placeholder='请填写任务名称' />
                </Form.Item>
              }
              </Radio>
              <Radio className={styles.radio} value={2}>自定义类型用例创建 {value === 2 &&
                <>
                  <Form.Item label='任务名称' name='taskName' className={styles.inlineFormItem} rules={[{ required: true, message: '任务名称不能为空' }]}>
                    <Input onChange={e => setTaskName(e.target.value)} className={styles.input} placeholder='请填写任务名称' />
                  </Form.Item>
                  <Form.Item required label='用例类型' name='' className={styles.inlineFormItem} rules={[{ required: true, message: '用例类型不能为空' }]}>
                    <Checkbox.Group className={styles.checkbox} onChange={e => setGameDictIdList(e as number[])} options={gameDictList} />
                  </Form.Item>
                </>
              }
              </Radio>
            </Space>
          </Radio.Group>
        </Form>
      </Modal >
    </>
  );
};

export default CreateTaskModal;