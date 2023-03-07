module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: ['airbnb-base'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        ts: true
    },
    plugins: ['@typescript-eslint'],
    globals: {
        NodeListOf: 'readonly',
        Modernizr: 'readonly',
        Stats: 'readonly',
        JQuery: 'readonly',
        $: 'readonly',
        Window: 'readonly',
        CustomEase: 'readonly',
        gsap: 'readonly',
        GSAPStatic: 'readonly',
        JQueryXHR: 'readonly',
        SplitText: 'readonly',
        imagesLoaded: 'readonly',
        Swiper: 'readonly',
        ISwiperOptions: 'readonly',
        Youtube: 'readonly',
        YT: 'readonly'
    },
    rules: {
        'no-console': 'off',
        'linebreak-style': 'off',
        'no-useless-escape': 'off',
        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        'comma-spacing': ['error', { after: true, before: false }],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'indent': [1, 4, { SwitchCase: 1 }],
        'quote-props': ['warn', 'consistent-as-needed'],
        'arrow-parens': ['error', 'as-needed'],
        'no-console:': 'off',
        'no-multiple-empty-lines': [2, { max: 3, maxEOF: 1, maxBOF: 0 }],
        'no-param-reassign': [2, { props: false }],
        'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],
        'padding-line-between-statements': 'off',
        '@typescript-eslint/padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: ['interface', 'type']
            },
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {
                    memberTypes: [
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',
                        'static-field',

                        'public-static-method',
                        'protected-static-method',
                        'private-static-method',

                        'public-instance-field',
                        'public-decorated-field',
                        'public-abstract-field',

                        'protected-instance-field',
                        'protected-decorated-field',
                        'protected-abstract-field',

                        'private-instance-field',
                        'private-decorated-field',
                        'private-abstract-field',

                        'public-field',
                        'instance-field',
                        'protected-field',
                        'private-field',
                        'abstract-field',

                        'constructor',

                        'public-method',
                        'protected-method',
                        'private-method',
                    ]
                }
            },
        ],
        'lines-between-class-members': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'max-len': ['warn', { code: 140 }],
        'no-unused-vars': 'warn',
        'no-new': 'warn',
        'no-undef': 'warn',
        'no-use-before-define': 'warn',
        'no-case-declarations': 'off',
        'no-nested-ternary': 'off',
        'max-classes-per-file': 'off',
        'padded-blocks': 'off',
        'object-curly-newline': ['warn', { multiline: true }],
        'object-curly-spacing': ['warn', 'always', { arraysInObjects: true, objectsInObjects: true }],
        'object-property-newline': 'off'
    }
};
