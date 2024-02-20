import React, { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './StatHeader.module.scss'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title } = useGetPageInfo()
  const urlInpRef = useRef<InputRef>(null)

  function copy() {
    const elem = urlInpRef.current
    if (!elem) return
    elem.select()
    document.execCommand('Copy')
    message.success('拷贝成功')
  }

  function genLinkAndQRCodeElem() {
    const url = `http://localhost:3000/question/${id}`

    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )

    return (
      <Space>
        <Input addonBefore="链接" value={url} readOnly style={{ width: '300px' }} ref={urlInpRef} />
        <Tooltip title="拷贝链接">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button shape="circle" icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-warpper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
