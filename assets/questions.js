/* 由 tools/build-site.mjs 从超星作业保存页自动生成，请勿手改 */
window.QUIZ_DATA = {
  "meta": {
    "title": "单元1-2",
    "course": "Java 程序设计",
    "count": 21,
    "fullScore": "100",
    "section": "一. 程序题（共21题，100分）"
  },
  "questions": [
    {
      "no": 1,
      "id": "404072813",
      "type": "程序题",
      "stem": "<p>所谓回文数，指的是数字正序排列和逆序排列都是同一数值的数，比如，数字1221 按正序和逆序排列都是1221，因此1221 是回文数，而数字1234按逆序排列是4321，4321 与1234 不是同1 个数，因此1234 不是回文数。请编写程序，获取用户输入的4 位数字，并判断用户输入的数字是否是回文数。</p>\n<p>输出结果如下图所示（注：标点符号为全角符号）</p>\n<p>示例1</p>\n<p><img class=\"stem-img\" src=\"assets/images/9b23673ab113375e716f9fcf771ae934.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>示例2</p>\n<p><img class=\"stem-img\" src=\"assets/images/f6c0415038a5683145813bc0ba5bcfbd.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>示例3</p>\n<p><img class=\"stem-img\" src=\"assets/images/0d0aac9ccd646915af15bc90e2a08e6e.png\" alt=\"运行结果示例\" loading=\"lazy\"></p>",
      "summary": "所谓回文数，指的是数字正序排列和逆序排列都是同一数值的数，比如，数字1221 按正序和逆序排列都是1221，因此1221 是回文数，而数字1234按逆序排列…",
      "images": [
        "9b23673ab113375e716f9fcf771ae934.png",
        "f6c0415038a5683145813bc0ba5bcfbd.png",
        "0d0aac9ccd646915af15bc90e2a08e6e.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n      public static void main(String[] args) {\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入长度为4位的数字：\");\n                String s = sc.next();\n                if(s.length() != 4){\n                              System.out.println(\"错误，输入的数字长度不为4。\");\n                }else{\n                              if(s.charAt(0)==s.charAt(3) && s.charAt(1)==s.charAt(2)){\n                                                System.out.println(s+\"是一个回文数！\");\n                              }else{\n                                                System.out.println(s+\"不是一个回文数！\");\n                              }\n                }\n      }\n}",
      "sampleStdin": "1221"
    },
    {
      "no": 2,
      "id": "404072814",
      "type": "程序题",
      "stem": "<p>假定小鸡1 元3 只，公鸡3 元1 只，母鸡5 元1 只。请输入购鸡钱数用于购买100 只鸡，请编写程序列出所有的购鸡方案。</p>\n<p>输出结果如下图所示（注：输入的钱数为整数，标点符号为全角符号）</p>\n<p>示例1</p>\n<p><img class=\"stem-img\" src=\"assets/images/6933fa781b436374743ddfa342c8f951.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>示例2</p>\n<p><img class=\"stem-img\" src=\"assets/images/e885d79f187d2b4b6427b14dfc479d54.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>示例3</p>\n<p><img class=\"stem-img\" src=\"assets/images/ecdb8efa94c1a6428cb7a61c70e805ad.png\" alt=\"运行结果示例\" loading=\"lazy\"></p>",
      "summary": "假定小鸡1 元3 只，公鸡3 元1 只，母鸡5 元1 只。请输入购鸡钱数用于购买100 只鸡，请编写程序列出所有的购鸡方案。 输出结果如下图所示（注：输入的…",
      "images": [
        "6933fa781b436374743ddfa342c8f951.png",
        "e885d79f187d2b4b6427b14dfc479d54.png",
        "ecdb8efa94c1a6428cb7a61c70e805ad.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"请输入购鸡的钱数：\");\n        int money = sc.nextInt();\n        System.out.println(money + \"钱买百鸡的方案如下\");\n\n        boolean found = false;\n\n        for (int h = 0; h <= 100; h++) {\n            for (int r = 0; r <= 100 - h; r++) {\n                int c = 100 - h - r;\n\n                if (c >= 0 && c % 3 == 0 && 5 * h + 3 * r + c / 3 == money) {\n                    System.out.println(\"母鸡：\" + h + \"只，公鸡：\" + r + \"只，小鸡：\" + c + \"只\");\n                    found = true;\n                }\n            }\n        }\n\n        if (!found) {\n            System.out.println(\"没有可执行的方案！\");\n        }\n    }\n}",
      "sampleStdin": "100"
    },
    {
      "no": 3,
      "id": "404072815",
      "type": "程序题",
      "stem": "<p>已知某快递点提供华东地区、华南地区、华北地区的寄件服务，其中华北地区编号为1、华东地区编号为2、华南地区编号为3，该快递点寄件价目表具体如表1 所示。<br></p>\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 表1 寄件价目表</p>\n<p><img class=\"stem-img\" src=\"assets/images/5ddf5a4f31b3812d2ecf1c46e795d527.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>假如用户在华北地区邮寄4kg 商品，快递收费公式为：首重+续重*2，即12+（4-2） *2，共计16 元。</p>\n<p>本任务要求编写代码，用户在控制台输入寄件地区编号和快递重量，实现根据表1 的价格计算快递费用的程序。</p>\n<p>输出结果如下图所示（注：输入的数值为整数，标点符号为全角符号）</p>\n<p>示例1</p>\n<p><img class=\"stem-img\" src=\"assets/images/de8385549c0074854b5b50d774b79bde.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>示例2</p>\n<p><img class=\"stem-img\" src=\"assets/images/49232d9b3fd883c2b495abd185f357ed.png\" alt=\"运行结果示例\" loading=\"lazy\"></p>",
      "summary": "已知某快递点提供华东地区、华南地区、华北地区的寄件服务，其中华北地区编号为1、华东地区编号为2、华南地区编号为3，该快递点寄件价目表具体如表1 所示。 表1…",
      "images": [
        "5ddf5a4f31b3812d2ecf1c46e795d527.png",
        "de8385549c0074854b5b50d774b79bde.png",
        "49232d9b3fd883c2b495abd185f357ed.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"请输入寄件的地区编号：\");\n        int area = sc.nextInt();\n        if (area < 1 || area > 3) {\n            System.out.println(\"输入的寄件的地区编号有误！\");\n        } else {\n            System.out.print(\"请输入快递重量（kg）：\");\n            int weight = sc.nextInt();\n            int money = 0;\n            if (area == 1) {\n\n                money = 12;\n                if (weight > 2) {\n                    money += (weight - 2) * 2;\n                }\n            } else if (area == 2) {\n\n                money = 13;\n                if (weight > 2) {\n                    money += (weight - 2) * 3;\n                }\n            } else if (area == 3) {\n\n                money = 14;\n                if (weight > 2) {\n                    money += (weight - 2) * 3;\n                }\n            }\n            System.out.println(\"本次快递费为：\" + money + \"元\");\n        }\n    }\n}",
      "sampleStdin": "2 5"
    },
    {
      "no": 4,
      "id": "404072821",
      "type": "程序题",
      "stem": "<p>利用switch语句和输入流类Scanner，实现简单的四则运算。</p>\n<p>提示：（1) Scanner类的nextDouble()方法用于输入双精度浮点数；next()方法用于输入字符串。</p>\n<p>(2) String类的charAt()方法可以获取字符串中指定索引的字符。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/23cb27c8d1fc1298766ffb189d5adb20.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/fca9854dc47e7ca06feb1f7f05bc4159.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>\n<p><span><span>运行结果示例3：</span></span></p>\n<p><span><span><img class=\"stem-img\" src=\"assets/images/fd5d81345c99ca19bc5b3fd34b1536a4.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></span></p>\n<p><span><span><span>运行结果示例4：</span></span></span></p>\n<p><span><span><span><img class=\"stem-img\" src=\"assets/images/b179f8b750b22531d7eb7380c4e25c91.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></span></span></p>",
      "summary": "利用switch语句和输入流类Scanner，实现简单的四则运算。 提示：（1) Scanner类的nextDouble()方法用于输入双精度浮点数；nex…",
      "images": [
        "23cb27c8d1fc1298766ffb189d5adb20.png",
        "fca9854dc47e7ca06feb1f7f05bc4159.png",
        "fd5d81345c99ca19bc5b3fd34b1536a4.png",
        "b179f8b750b22531d7eb7380c4e25c91.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"请输入第一个操作数（例如：12）：\");\n        double num1 = sc.nextDouble();\n        System.out.print(\"请输入四则运算符（例如：+、-、*、/）：\");\n        String opStr = sc.next();\n        char op = opStr.charAt(0);\n        System.out.print(\"请输入第二个操作数（例如：8）：\");\n        double num2 = sc.nextDouble();\n        double res = 0;\n        switch (op) {\n            case '+':\n                res = num1 + num2;\n                break;\n            case '-':\n                res = num1 - num2;\n                break;\n            case '*':\n                res = num1 * num2;\n                break;\n            case '/':\n                res = num1 / num2;\n                break;\n            default:\n                System.out.println(\"运算符错误\");\n                return;\n        }\n        System.out.println(num1 + (\"\" + op) + num2 + \"=\" + res);\n    }\n}",
      "sampleStdin": "12 + 8"
    },
    {
      "no": 5,
      "id": "404072822",
      "type": "程序题",
      "stem": "<p>计算1-3+5-7+ …… -99+101的值。</p>\n<p>运行结果如下：</p>\n<p><img class=\"stem-img\" src=\"assets/images/e302911f5807c648ff04ebe1afaea1d7.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "计算1-3+5-7+ …… -99+101的值。 运行结果如下：",
      "images": [
        "e302911f5807c648ff04ebe1afaea1d7.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n        public static void main(String[] args) {\n                          int sum = 0, flag = 1;\n                          for(int i = 1; i <= 101; i += 2) {\n                                                          sum += flag * i;\n                                                          flag = -flag;\n                          }\n                          System.out.println(\"1-3+5-7+...-99+101的值是: \"+sum);\n        }\n}",
      "sampleStdin": ""
    },
    {
      "no": 6,
      "id": "404072823",
      "type": "程序题",
      "stem": "<p>求数列2/1，3/2，5/3，8/5，13/8，21/13……的前 n 项的和。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/854f3e98dd70311eaea343a9138e8162.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/e9fe0147ab9574092bcc811479869a63.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>",
      "summary": "求数列2/1，3/2，5/3，8/5，13/8，21/13……的前 n 项的和。 运行结果示例1： 运行结果示例2：",
      "images": [
        "854f3e98dd70311eaea343a9138e8162.png",
        "e9fe0147ab9574092bcc811479869a63.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"输入n：\");\n        int n = sc.nextInt();\n\n        double sum = 0.0;\n        double a = 2;\n        double b = 1;\n\n        for (int i = 0; i < n; i++) {\n            sum += a / b;\n            double temp = a;\n            a = a + b;\n            b = temp;\n        }\n\n        System.out.println(\"前\" + n + \"项的和是: \" + sum);\n    }\n}",
      "sampleStdin": "5"
    },
    {
      "no": 7,
      "id": "404072824",
      "type": "程序题",
      "stem": "<p>输入一个字符串，统计该字符串中有多少个数字字符。&nbsp;</p>\n<p>提示：字符串的charAt()方法，可以获取指定索引位置的字符。</p>\n<p>运行结果示例：</p>\n<p><img class=\"stem-img\" src=\"assets/images/1d740fa90fbf60706bbdc1cad517994f.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "输入一个字符串，统计该字符串中有多少个数字字符。 提示：字符串的charAt()方法，可以获取指定索引位置的字符。 运行结果示例：",
      "images": [
        "1d740fa90fbf60706bbdc1cad517994f.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n      public static void main(String[] args) {\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入一个字符串：\");\n                String str = sc.nextLine();\n                int count = 0;\n                for(int i = 0; i < str.length(); i++){\n                              char c = str.charAt(i);\n                              if(c >= '0' && c <= '9'){\n                                                count++;\n                              }\n                }\n                System.out.println(str + \"中数字字符的数量是：\" + count);\n      }\n}",
      "sampleStdin": "abc123def45"
    },
    {
      "no": 8,
      "id": "404072825",
      "type": "程序题",
      "stem": "<p>输入一个整数n，计算从1到n（包括n）中所有能够被2或者被3整除的数之和。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/a2aa9bd04853e3afbcf7d07f58d6d4ea.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>运行结果示例2：</p>\n<p><img class=\"stem-img\" src=\"assets/images/afb9a4391e08495ce6ae6100816f2988.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "输入一个整数n，计算从1到n（包括n）中所有能够被2或者被3整除的数之和。 运行结果示例1： 运行结果示例2：",
      "images": [
        "a2aa9bd04853e3afbcf7d07f58d6d4ea.png",
        "afb9a4391e08495ce6ae6100816f2988.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n      public static void main(String[] args) {\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入一个整数n：\");\n                int n = sc.nextInt();\n                int sum = 0;\n                for(int i = 1; i <= n; i++){\n                              if(i % 2 == 0 || i % 3 == 0){\n                                                sum += i;\n                              }\n                }\n                System.out.println(\"1到\" + n + \"中所有能够被2或者被3整除的数之和是：\" + sum);\n      }\n}",
      "sampleStdin": "10"
    },
    {
      "no": 9,
      "id": "404072826",
      "type": "程序题",
      "stem": "<p>求出从键盘上输入的n个正整数中的最大值。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/936e5d5a9be5dd93853ecfae791c09bd.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/c091e68e3dcb36ca3afac97ee099c0ea.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>",
      "summary": "求出从键盘上输入的n个正整数中的最大值。 运行结果示例1： 运行结果示例2：",
      "images": [
        "936e5d5a9be5dd93853ecfae791c09bd.png",
        "c091e68e3dcb36ca3afac97ee099c0ea.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n      public static void main(String[] args) {\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入正整数的个数n：\");\n                int n = sc.nextInt();\n                System.out.println(\"请输入\" + n + \"个正整数：\");\n                int max = 0;\n                for(int i = 0; i < n; i++){\n                              int num = sc.nextInt();\n                              if(num > max){\n                                                max = num;\n                              }\n                }\n                System.out.println(\"最大值为：\" + max);\n      }\n}",
      "sampleStdin": "5\n3 7 2 9 4"
    },
    {
      "no": 10,
      "id": "404072827",
      "type": "程序题",
      "stem": "<p>求出m~n以内（包括m和n）的所有整数之和，其中m和n由用户输入(m&lt;=n)，程序执行后输出求和结果。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/382b00b5a5106e185dc8aaaecd3ab5b8.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/e237718ba25cfaaf09cb0a8dcf22366b.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>",
      "summary": "求出m~n以内（包括m和n）的所有整数之和，其中m和n由用户输入(m&lt;=n)，程序执行后输出求和结果。 运行结果示例1： 运行结果示例2：",
      "images": [
        "382b00b5a5106e185dc8aaaecd3ab5b8.png",
        "e237718ba25cfaaf09cb0a8dcf22366b.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n      public static void main(String[] args) {\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入整数m（m <= n）：\");\n                int m = sc.nextInt();\n                System.out.print(\"请输入整数n（m <= n）：\");\n                int n = sc.nextInt();\n        \n                if(m > n){\n                              System.out.println(\"m应该小于等于n\");\n                }else{\n                              int sum = 0;\n                              for(int i = m; i <= n; i++){\n                                                sum += i;\n                              }\n                              System.out.println(m + \"~\" + n + \"的所有整数之和为：\" + sum);\n                }\n      }\n}",
      "sampleStdin": "1 100"
    },
    {
      "no": 11,
      "id": "404072828",
      "type": "程序题",
      "stem": "<p>计算序列Sn=a+aa+aaa+……+aa…a的和，其中a是一个数字，序列中有n 项，每一项由a 重复构成。a和n的值均由键盘输入，输出序列之和Sn。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/f725c417d1a8de605ac95b40acf02ac0.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>运行结果示例2：</p>\n<p><img class=\"stem-img\" src=\"assets/images/1fd2cbef0ef5adfc29013e7b0a19ea8b.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><br></p>",
      "summary": "计算序列Sn=a+aa+aaa+……+aa…a的和，其中a是一个数字，序列中有n 项，每一项由a 重复构成。a和n的值均由键盘输入，输出序列之和Sn。 运行…",
      "images": [
        "f725c417d1a8de605ac95b40acf02ac0.png",
        "1fd2cbef0ef5adfc29013e7b0a19ea8b.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n      public static void main(String[] args) {\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入数字a：\");\n                int a = sc.nextInt();\n                System.out.print(\"请输入项数n：\");\n                int n = sc.nextInt();\n        \n                long sum = 0;\n                long item = 0;\n                for (int i = 0; i < n; i++) {\n                              item = item * 10 + a;\n                              sum += item;\n                }\n                System.out.println(\"序列的和Sn为：\" + sum);\n                sc.close();\n      }\n}",
      "sampleStdin": "2 3"
    },
    {
      "no": 12,
      "id": "404072829",
      "type": "程序题",
      "stem": "<p>使用循环或递归方法，计算n!</p>\n<p>(1) 定义静态方法fact()，接受参数n，计算n!</p>\n<p>(2) 在main方法中，调用fact()方法计算阶乘，n由键盘输入，输出返回的结果。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/40f6093c87174ada85431332e2afb4b5.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>运行结果示例2：</p>\n<p><img class=\"stem-img\" src=\"assets/images/f5d2bc83a63b1a478d295accdad84f03.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "使用循环或递归方法，计算n! (1) 定义静态方法fact()，接受参数n，计算n! (2) 在main方法中，调用fact()方法计算阶乘，n由键盘输入，…",
      "images": [
        "40f6093c87174ada85431332e2afb4b5.png",
        "f5d2bc83a63b1a478d295accdad84f03.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n\n    public static long fact(int n) {\n        if (n == 0 || n == 1) {\n            return 1;\n        }\n        return n * fact(n - 1);\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"请输入n：\");\n        int n = sc.nextInt();\n        long res = fact(n);\n        System.out.println(n + \"! = \" + res);\n        sc.close();\n    }\n}",
      "sampleStdin": "5"
    },
    {
      "no": 13,
      "id": "404072830",
      "type": "程序题",
      "stem": "<p>输入一组数据，当输入0时输入结束，统计输入数据的个数及输入数据的平均值（小数点后保留1位）。</p>\n<p>提示：在System.out.printf()中，%.1f 表示将浮点数格式化为小数点后保留1位小数的字符串。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/c49c77b3a76e50b2fa575cfabb14476a.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>运行结果示例2：</p>\n<p><img class=\"stem-img\" src=\"assets/images/c17275e60522cac56bfcb57bba879c74.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "输入一组数据，当输入0时输入结束，统计输入数据的个数及输入数据的平均值（小数点后保留1位）。 提示：在System.out.printf()中，%.1f 表…",
      "images": [
        "c49c77b3a76e50b2fa575cfabb14476a.png",
        "c17275e60522cac56bfcb57bba879c74.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n      public static void main(String[] args) {\n                Scanner input = new Scanner(System.in);\n        \n                int count = 0;\n                double sum = 0;\n        \n                System.out.println(\"请输入一组数据（输入0结束）:\");\n        \n                double num = input.nextDouble();\n        \n                while (num != 0) {\n                              sum += num;\n                              count++;\n                              num = input.nextDouble();\n                }\n        \n                System.out.println(\"输入数据的个数: \" + count);\n                System.out.printf(\"输入数据的平均值: %.1f\", sum / count);\n      }\n}",
      "sampleStdin": "85 92 78 90 0"
    },
    {
      "no": 14,
      "id": "404072831",
      "type": "程序题",
      "stem": "<p>从键盘输入3个整数a,b,c的值，要求按从大到小的顺序输出。</p>\n<p>运行结果<span>示例</span>1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/3cc5d4a8d0aaabd5c551032a7a89ba72.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p>运行结果<span>示例</span>2：</p>\n<p><img class=\"stem-img\" src=\"assets/images/ac8d98f4eae4a001f4f2b299e3c4fea8.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "从键盘输入3个整数a,b,c的值，要求按从大到小的顺序输出。 运行结果 示例 1： 运行结果 示例 2：",
      "images": [
        "3cc5d4a8d0aaabd5c551032a7a89ba72.png",
        "ac8d98f4eae4a001f4f2b299e3c4fea8.png"
      ],
      "refCode": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        int temp;\n\n        if (a < b) {\n            temp = a;\n            a = b;\n            b = temp;\n        }\n        if (a < c) {\n            temp = a;\n            a = c;\n            c = temp;\n        }\n\n        if (b < c) {\n            temp = b;\n            b = c;\n            c = temp;\n        }\n        System.out.println(a + \",\" + b + \",\" + c);\n        sc.close();\n    }\n}",
      "sampleStdin": "3 1 2"
    },
    {
      "no": 15,
      "id": "404072832",
      "type": "程序题",
      "stem": "<p>编写程序计算下面分段函数的值：</p>\n<p>f(x) = x<sup>3</sup> +5&nbsp;&nbsp; (x≤0)</p>\n<p>f(x) = x<sup>2</sup>-x+3&nbsp; (0＜x≤20)</p>\n<p>f(x) = 7x+2&nbsp;&nbsp; &nbsp;(x＞20)</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/3a446fad54a7708fc8b87ec301ce434d.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果<span>示例</span>2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/b066154bb817a547d2e139d00a339a7b.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>\n<p><span><span>运行结果<span>示例</span>3：</span></span></p>\n<p><img class=\"stem-img\" src=\"assets/images/e8ca2a59a1e06ff46a9361aad0c6c336.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "编写程序计算下面分段函数的值： f(x) = x 3 +5 (x≤0) f(x) = x 2 -x+3 (0＜x≤20) f(x) = 7x+2 (x＞20…",
      "images": [
        "3a446fad54a7708fc8b87ec301ce434d.png",
        "b066154bb817a547d2e139d00a339a7b.png",
        "e8ca2a59a1e06ff46a9361aad0c6c336.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.println(\"请输入x的值：\");\n        double x = sc.nextDouble();\n        double f;\n        if (x <= 0) {\n            f = x * x * x + 5;\n        } else if (x <= 20) {\n            f = x * x - x + 3;\n        } else {\n            f = 7 * x + 2;\n        }\n        System.out.println(\"f(x)的值为：\" + f);\n        sc.close();\n    }\n}",
      "sampleStdin": "2"
    },
    {
      "no": 16,
      "id": "404072833",
      "type": "程序题",
      "stem": "<p>输入一正整数k，求出它是几位数，并按逆序输出各位数字。</p>\n<p>提示：String.valueOf()用于将int转换为String。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/e9cc0ede2fb3f5510d2ce5ef68b6d52e.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/07a522e3f3f7901551722f90656cae5c.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>",
      "summary": "输入一正整数k，求出它是几位数，并按逆序输出各位数字。 提示：String.valueOf()用于将int转换为String。 运行结果示例1： 运行结果示…",
      "images": [
        "e9cc0ede2fb3f5510d2ce5ef68b6d52e.png",
        "07a522e3f3f7901551722f90656cae5c.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"请输入一个正整数：\");\n        int k = sc.nextInt();\n\n        String s = String.valueOf(k);\n        int len = s.length();\n\n        String reverse = \"\";\n        for (int i = len - 1; i >= 0; i--) {\n            reverse += s.charAt(i);\n        }\n        System.out.println(k + \"是一个\" + len + \"位数，逆序输出为：\" + reverse);\n        sc.close();\n    }\n}",
      "sampleStdin": "12345"
    },
    {
      "no": 17,
      "id": "404072834",
      "type": "程序题",
      "stem": "<p>如果一个整数<span>的</span>各位数字的立方和等于该数本身，这个整数就是<span>水仙花数，</span>如153=1^3+5^3+3^3。<span>输入一个3位数，判断其是否为水仙花数，要求如下：</span></p>\n<p>(1) 定义静态方法is()，判断输入参数的各位数字之立方和是否等于其自身。</p>\n<p>(2) 在main方法中，输入一个<span>3位数，调用<span>is()<span>方法，<span>判断其是否为3位水仙花数。</span></span></span></span></p>\n<p><span><span><span>运行结果示例1：</span></span></span></p>\n<p><span><span><span><img class=\"stem-img\" src=\"assets/images/208c494165da6dc2d17d7780b14470bf.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></span></span></p>\n<p><span><span><span><span>运行结果示例2：</span></span></span></span></p>\n<p><img class=\"stem-img\" src=\"assets/images/7f0593285ec3fe5680d3e8c17c5ef246.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "如果一个整数 的 各位数字的立方和等于该数本身，这个整数就是 水仙花数， 如153=1^3+5^3+3^3。 输入一个3位数，判断其是否为水仙花数，要求如下…",
      "images": [
        "208c494165da6dc2d17d7780b14470bf.png",
        "7f0593285ec3fe5680d3e8c17c5ef246.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n\n    public static boolean is(int n) {\n        int a = n / 100;\n        int b = n / 10 % 10;\n        int c = n % 10;\n        int sum = a * a * a + b * b * b + c * c * c;\n        return sum == n;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"输入一个三位整数：\");\n        int num = sc.nextInt();\n        boolean res = is(num);\n        System.out.println(num + \"是否为水仙花数？\" + res);\n        sc.close();\n    }\n}",
      "sampleStdin": "153"
    },
    {
      "no": 18,
      "id": "404072835",
      "type": "程序题",
      "stem": "<p>有1、2、3、4四个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？&nbsp;</p>\n<p>运行结果如下：</p>\n<p><img class=\"stem-img\" src=\"assets/images/81b9b9ee03f9efa49af51f55670dface.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "有1、2、3、4四个数字，能组成多少个互不相同且无重复数字的三位数？都是多少？ 运行结果如下：",
      "images": [
        "81b9b9ee03f9efa49af51f55670dface.png"
      ],
      "refCode": "public class Main {\n    public static void main(String[] args) {\n        int count = 0;\n        for (int i = 1; i <= 4; i++) {\n            for (int j = 1; j <= 4; j++) {\n                for (int k = 1; k <= 4; k++) {\n\n                    if (i != j && j != k && i != k) {\n                        int num = i * 100 + j * 10 + k;\n                        System.out.println(num);\n                        count++;\n                    }\n                }\n            }\n        }\n        System.out.println(\"共有\" + count + \"种组合\");\n    }\n}",
      "sampleStdin": ""
    },
    {
      "no": 19,
      "id": "404072836",
      "type": "程序题",
      "stem": "<p>将数组{8, 2, 6, 5, 9, 4, 1, 3}的值按逆序重新存放并输出。</p>\n<p>运行结果如下：</p>\n<p><img class=\"stem-img\" src=\"assets/images/9711d0b7a2baa7eb12f89b063b9202b0.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>",
      "summary": "将数组{8, 2, 6, 5, 9, 4, 1, 3}的值按逆序重新存放并输出。 运行结果如下：",
      "images": [
        "9711d0b7a2baa7eb12f89b063b9202b0.png"
      ],
      "refCode": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {\n            8,\n            2,\n            6,\n            5,\n            9,\n            4,\n            1,\n            3\n        };\n        int len = arr.length;\n\n        for (int i = 0; i < len / 2; i++) {\n            int temp = arr[i];\n            arr[i] = arr[len - 1 - i];\n            arr[len - 1 - i] = temp;\n        }\n\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + \" \");\n        }\n    }\n}",
      "sampleStdin": ""
    },
    {
      "no": 20,
      "id": "404072837",
      "type": "程序题",
      "stem": "<p>从键盘输入5个数存入一个数组，然后输出该数组中的最小值。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/2e850a9b12c454daf9a1ee75ae47d9d3.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/e2408b3bad3974b659fecdd033a6e4ef.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>",
      "summary": "从键盘输入5个数存入一个数组，然后输出该数组中的最小值。 运行结果示例1： 运行结果示例2：",
      "images": [
        "2e850a9b12c454daf9a1ee75ae47d9d3.png",
        "e2408b3bad3974b659fecdd033a6e4ef.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[] arr = new int[5];\n        System.out.println(\"请输入5个整数：\");\n        for (int i = 0; i < 5; i++) {\n            arr[i] = sc.nextInt();\n        }\n        int min = arr[0];\n        for (int i = 1; i < 5; i++) {\n            if (arr[i] < min) {\n                min = arr[i];\n            }\n        }\n        System.out.println(\"数组中的最小值是：\" + min);\n        sc.close();\n    }\n}",
      "sampleStdin": "5 3 8 1 9"
    },
    {
      "no": 21,
      "id": "404072838",
      "type": "程序题",
      "stem": "<p>在有序数组{1, 3, 5, 7, 9, 11, 13, 15}中，查找某个元素（由键盘输入），若查找成功返回该元素下标，否则返回-1。</p>\n<p>运行结果示例1：</p>\n<p><img class=\"stem-img\" src=\"assets/images/80857b0efbcfd933d4d4789a2a47f42f.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></p>\n<p><span>运行结果示例2：</span></p>\n<p><span><img class=\"stem-img\" src=\"assets/images/fc823e241d5ae20bd1c95ce395be8551.png\" alt=\"运行结果示例\" loading=\"lazy\"><br></span></p>",
      "summary": "在有序数组{1, 3, 5, 7, 9, 11, 13, 15}中，查找某个元素（由键盘输入），若查找成功返回该元素下标，否则返回-1。 运行结果示例1： …",
      "images": [
        "80857b0efbcfd933d4d4789a2a47f42f.png",
        "fc823e241d5ae20bd1c95ce395be8551.png"
      ],
      "refCode": "import java.util.Scanner;\npublic class Main {\n      public static void main(String[] args) {\n                int[] arr = {1, 3, 5, 7, 9, 11, 13, 15};\n                Scanner sc = new Scanner(System.in);\n                System.out.print(\"请输入要查找的数字：\");\n                int target = sc.nextInt();\n        \n                int left = 0;\n                int right = arr.length - 1;\n                int index = -1;\n                //二分查找\n                while(left <= right){\n                              int mid = (left + right)/2;\n                              if(arr[mid] == target){\n                                                index = mid;\n                                                break;\n                              }else if(arr[mid] < target){\n                                                left = mid + 1;\n                              }else{\n                                                right = mid -1;\n                              }\n                }\n                System.out.println(\"查找结果：\" + index);\n                sc.close();\n      }\n}",
      "sampleStdin": "7"
    }
  ]
};
