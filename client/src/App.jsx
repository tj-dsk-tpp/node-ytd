import { useState } from "react";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import {
  PlayCircleOutlined,
  DownloadOutlined,
  AudioMutedOutlined
} from "@ant-design/icons";
import axios from "axios";
import "./app.css"

const { Title } = Typography;

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    labelCol: { span: 8 }, wrapperCol: { span: 8 }
  }
  const submitForm = async values => {
    setLoading(true);
    const tmpData = await axios.get(`http://localhost:4000/download?url=${values.url}`);
    setData(tmpData);
    setLoading(false);
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <span>
          <PlayCircleOutlined className="pco" />
        </span>
        <Title className="ttl" >
          NODE YOUTUBE DOWNLOADER
        </Title>
        <div className="container">
          <Form form={form} name="dynamic_rule" onFinish={submitForm}>
            <Form.Item {...formItemLayout} name="url" label="" colon={false}>
              <Input
                size="large"
                placeholder="Paste the video link here."
                required={true}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<DownloadOutlined />}
                size="large"
                loading={loading}
              >
                Download
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ marginTop: "3rem" }}>
          {data !== null ? (
            <>
              <iframe
                width="570"
                height="320"
                scr={`${data.data.url}`}
                title="video"
              />
              <div
                style={{
                  marginTop: "2rem",
                  paddingLeft: "10rem",
                  paddingRight: "10rem"
                }}
              >
                <Title level={5}>Available Formats</Title>
                <br />
                <Row gutter={[10, 20]}>
                  {data?.data.info.map((val, ind) => (
                    <Col key={ind} xs={24} md={3}>
                      <Button
                        download
                        href={val.url}
                        target="_self"
                        type="primary"
                        ghost
                        icon={
                          val.hasAudio ?
                            null :
                            (
                              <AudioMutedOutlined style={{ color: "#f00" }} />
                            )
                        }
                      >
                        {val.mimeType.split(";")[0] + " "}
                        {val.hasVideo ? val.height + "p" : ""}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          ) : (
            <>
              <Title level={4}>Hello There</Title>
            </>
          )}
        </div>
      </div>
    </>
  )
};

export default App;