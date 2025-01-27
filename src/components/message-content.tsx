import { View, Text } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'

type MessageContentProps = {
  message: string
}

export function MessageContent({ message }: MessageContentProps) {
  return (
    <View className="mb-4">
      <View>
        <AutoHeightWebView
          originWhitelist={['*']}
          source={{
            html: `
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
              <div style="width: 100%;">
                ${message}
              </div>
            `,
          }}
          style={{ width: '100%' }}
          customStyle={`
            * {
              max-width: 100% !important;
              box-sizing: border-box;
              word-wrap: break-word;
            }
            img {
              max-width: 100% !important;
            }
          `}
          scalesPageToFit={false}
          viewportContent={
            'width=device-width, initial-scale=1.0, maximum-scale=1.0'
          }
        />
      </View>
    </View>
  )
}
