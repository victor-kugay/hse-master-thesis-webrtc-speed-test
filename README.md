# HSE | Master Thesis | WebRTC Speed Test

<div>
  <a>
    <img src="https://img.shields.io/badge/-hse-lightblue?logo=data:image/png;base64,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&logoColor=1DA1F2&style=for-the-badge&logoWidth=30" />
  </a>
</div>


## ✍  Description

The repository was founded with the purpose of performing webrtc speed test for Victor Kugay master thesis.

## 💻  Table of contents

* [src](./src) - source code for sharing data using webrtc

