
export default {
    data: {
        sourceLang: "英文", // TODO: 不应该写死
        destLang: "简体中文",
        sourceLangButtonAnimationData: {},
        destLangButtonAnimationData: {},
        typings: false
    },

    onReady() {
        this._langButtonAnimation = wx.createAnimation({
            duration: 250,
            timingFunction: "ease"
        });

        this._langTransferDelayTimer = null;
    },

    handleLangTransferButtonTap() {
        let animationData = this._getLangButtonAnimationData();

        this.setData({
            sourceLangButtonAnimationData: animationData,
            destLangButtonAnimationData: animationData
        });

        clearTimeout(this._langTransferDelayTimer);

        this._langTransferDelayTimer = setTimeout(() => {
            this.setData({
                sourceLang: this.data.destLang,
                destLang: this.data.sourceLang
            });
        }, 200);
    },

    handleSourceLangButtonTap() {
        this.pickLang([this.data.sourceLang, this.data.destLang])
            .then(lang => {
                if (this.data.sourceLang === lang) {
                    return;
                }

                this.setData({
                    sourceLangButtonAnimationData: this._getLangButtonAnimationData(),
                });

                clearTimeout(this._langTransferDelayTimer);

                this._langTransferDelayTimer = setTimeout(() => {
                    this.setData({
                        sourceLang: lang,
                    });
                }, 200);
            });
    },


    handleDestLangButtonTap() {
        this.pickLang([this.data.sourceLang, this.data.destLang])
            .then(lang => {
                if (this.data.destLang === lang) {
                    return;
                }

                this.setData({
                    destLangButtonAnimationData: this._getLangButtonAnimationData(),
                });

                clearTimeout(this._langTransferDelayTimer);

                this._langTransferDelayTimer = setTimeout(() => {
                    this.setData({
                        destLang: lang,
                    });
                }, 200);
            });
    },

    handleInputAreaFoucs() {
        if (this.data.typing) {
            return;
        }

        this.setData({
            typing: true
        });
    },

    handleInputAreaChange(event) {
        let value = event.detail.value;

        clearTimeout(this._querySuggestionsDelayTimer);
        this._querySuggestionsDelayTimer = setTimeout(
            () => {
                this.querySuggestions(value);
            },
            200
        );
    },

    handleCancelInputButtonTap() {
        this.setData({
            inputSourceValue: '',
            typing: false
        });

        this.querySuggestions('');
    },

    _getLangButtonAnimationData() {
        this._langButtonAnimation.opacity(0).step();
        this._langButtonAnimation.opacity(1).step({ duration: 240 });
        return this._langButtonAnimation.export();
    }
}
