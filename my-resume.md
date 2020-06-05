# react-testing-library
- PayPalのエンジニアでありフロントエンドのTDDの第一人者であるKent C Doddsが作成
- Reactコンポーネントをテストするための非常に軽量なソリューション
- いくつかのライブラリを併用
    - jest
    - jest-dom
    - react-testing-library
- create-react-appには初めから導入されている
- どのセレクタ/APIを使ってComponentを操作し、どのカスタムマッチャを使ってアサーションするかがキモになってくる





## Queries
### Variants
#### getBy
getBy* クエリは、クエリの最初にマッチするノードを返し、マッチする要素がない場合や複数のマッチが見つかった場合はエラーをスローします(代わりに getAllByを使用します)。

#### getAllBy
getAllBy* クエリは、クエリにマッチするすべてのノードの配列を返し、マッチする要素がない場合はエラーをスローします。

#### queryBy
queryBy* クエリは、クエリの最初にマッチするノードを返し、マッチする要素がない場合はnullを返します。これは、存在しない要素をアサートするのに便利です。これは、複数のマッチが見つかった場合にスローされます（代わりに queryAllBy を使用します）。

#### queryAllBy
queryAllBy* クエリは、クエリにマッチするすべてのノードの配列を返し、マッチする要素がない場合は空の配列([])を返します。

#### findBy
findBy* クエリは、与えられたクエリにマッチする要素が見つかったときに解決するプロミスを返します。要素が見つからなかった場合や、デフォルトのタイムアウトが 1000ms になってから複数の要素が見つかった場合は、プロミスは拒否されます。複数の要素を見つける必要がある場合は、findAllByを使用します。

注意してほしいのは、getBy* クエリと waitFor を単純に組み合わせたものです。findBy* クエリは、最後の引数として waitFor オプションを受け入れます。(すなわち、screen.findByText('text', queryOptions, waitForOptions))

#### findAllBy
findAllBy* クエリは、指定されたクエリにマッチする要素が見つかった場合に、要素の配列に解決するプロミスを返します。デフォルトのタイムアウト時間が 1000ms を過ぎても要素が見つからない場合は、プロミスは拒否されます。

### Options
クエリの引数には、文字列、正規表現、関数を指定できます。ノードのテキストがどのように解析されるかを調整するオプションもあります。

クエリに渡すことができるものについては、TextMatch を参照してください。

#### screen
DOM Testing Library がエクスポートするすべてのクエリは、第一引数としてコンテナを受け入れます。document.body 全体への問い合わせは非常に一般的であるため、DOM Testing Library は、document.body に事前にバインドされているすべてのクエリを持つ screen オブジェクトもエクスポートします (income 機能を使用しています)。

```javascript
import { screen } from '@testing-library/dom'
// NOTE: many framework-implementations of Testing Library
// re-export everything from `@testing-library/dom` so you
// may be able to import screen from your framework-implementation:
// import {render, screen} from '@testing-library/react'

const exampleHTML = `
  <label for="example">Example</label>
  <input id="example" />
`
document.body.innerHTML = exampleHTML
const exampleInput = screen.getByLabelText(/example/i)
```

##### screen.debug
便利なように、screen はクエリに加えてデバッグメソッドも公開しています。このメソッドは基本的に console.log(prettyDOM() のショートカットです。) このメソッドは、ドキュメント、単一の要素、または要素の配列のデバッグをサポートしています。

```javascript
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))
```

### Queries

#### ByLabelText
getByLabelText, queryByLabelText, getAllByLabelText, queryAllByLabelText findByLabelText, findAllByLabelText

これは、与えられた TextMatch にマッチするラベルを検索し、そのラベルに関連付けられた要素を見つけます。

#### ByPlaceholderText
getByPlaceholderText, queryByPlaceholderText, getAllByPlaceholderText, queryAllByPlaceholderText, findByPlaceholderText, findAllByPlaceholderText

これは、placeholder属性を持つすべての要素を検索し、与えられた TextMatch にマッチするものを見つけます。

プレースホルダはラベルの代わりにはなりませんので、一般的には getByLabelText を使用します。


#### ByText
getByText, queryByText, getAllByText, queryAllByText, findByText, findAllByText

これは、与えられたTextMatchにマッチするtextContentを持つテキストノードを持つすべての要素を検索します。

また、type属性がsubmitまたはbuttonのいずれかである入力に対しても動作します。


#### ByAltText
getByAltText, queryByAltText, getAllByAltText, queryAllByAltText, findByAltText, findAllByAltText

これは、与えられたaltテキストを持つ要素(通常はimgタグ)を返します。alt属性を受け入れる要素のみをサポートしていることに注意してください。imgタグ, inputタグ, areaタグ (非推奨なので意図的に appletタグを除外しています)。

#### ByTitle
getByTitle, queryByTitle, getAllByTitle, queryAllByTitle, findByTitle, findAllByTitle

title属性に一致する要素を返します。
SVG内のtitle要素も見つけます。

#### ByDisplayValue
getByDisplayValue, queryByDisplayValue, getAllByDisplayValue, queryAllByDisplayValue, findByDisplayValue, findAllByDisplayValue


一致する表示値を持つinput、textarea、またはselect要素を返します。




#### ByRole
getByRole, queryByRole, getAllByRole, queryAllByRole, findByRole, findAllByRole


#### ByTestId
getByTestId, queryByTestId, getAllByTestId, queryAllByTestId, findByTestId, findAllByTestId

指導原則の精神に則り、他のクエリがあなたのユースケースで機能しない場合にのみ、これを使用することをお勧めします。data-testid属性を使用することは、あなたのソフトウェアがどのように使用されているかに似ていないので、可能であれば避けるべきです。とはいえ、DOM 構造に基づいたクエリや css クラス名のスタイリングよりははるかに優れています。データテスティッドについての詳細は、ブログ記事 "Making your UI tests resilient to change "を参照してください。




## どのクエリを使うべきか
















# 参考文献
- [フロントエンドでTDDを実践する（react-testing-libraryを使った実践編）](https://qiita.com/taneba/items/b21f5fee17eb593b30c8)

- Testing Library
    - [Queries](https://testing-library.com/docs/dom-testing-library/api-queries)

    - [Which query should I use?](https://testing-library.com/docs/guide-which-query)

-[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom#tohavetextcontent)