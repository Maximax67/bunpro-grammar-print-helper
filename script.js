function convertToPrintVersion(scale = 0.75, subscriptionRequired = false) {
    function deleteById(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    }

    function deleteBySelector(selector) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach(element => element.remove());
        }
    }

    if (subscriptionRequired && document.querySelector('#js-tour-learn-examples > .relative > ul > li a[href="/signup"]')) {
        throw new Error('Page not loaded completely, login was not successful or not have subscription');
    }

    const fontWeights = ['400', '600', '700'];
    const baseFontURL = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP';
    fontWeights.forEach(weight => {
        const link = document.createElement('link');
        link.href = `${baseFontURL}:wght@${weight}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    });

    document.documentElement.style.zoom = String(scale);
    document.body.setAttribute('data-furigana', 'true');

    deleteById('floating-portal-header');
    deleteById('floating-portal-footer');
    deleteById('tooltip-portal');
    deleteById('js-tour-learn-discussion');
    deleteBySelector('#js-page-top > .LoadingSpinnerFullscreen');
    deleteBySelector('#js-page-top > .fixed');
    deleteBySelector('#js-page-top > main > article > .relative');
    deleteBySelector('#js-page-top > main > article > .w-full > aside');
    deleteBySelector('#js-page-top > .bg-subheader');
    deleteBySelector('#js-tour-learn-examples > .relative > header.sticky');
    deleteBySelector('#js-page-top > main > footer');
    deleteBySelector('#js-tour-learn-resources > ul > li > div > ul.items-center');
    deleteBySelector('#js-tour-learn-resources > ul > li > ul > li > div > div.p-6');
    deleteBySelector('svg');

    const lastSection = document.querySelector('#js-page-top > main > article > .w-full > .grid > section:last-of-type');
    if (lastSection && !lastSection.id) {
        lastSection.remove();
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .writeup-examples--holder > .writeup-example { padding: 0.5rem !important; background-color: white !important }
        html, .bg-tertiary-bg, .bp-reviewable-quiz-gradient, .bg-secondary-bg, .bg-primary-bg { background-color: white !important; }
        #js-page-top > main > article > .w-full > .grid { gap: 20px; }
        .text-reviewable-header-desktop { font-size: 3.75rem; line-height: 4.25rem; }
        #examples { margin-bottom: 1rem !important; }
        #js-tour-learn-structure, #js-tour-learn-details { padding: 14px; }
        #structure, #details { margin-bottom: 12px !important; }
        .prose :where(p):not(:where([class~=not-prose] *)) { margin-top: 0.5em; margin-bottom: 0.5em; }
        .prose :where(h4):not(:where([class~=not-prose] *)) { margin-top: 1.25em; }
        .prose :where(.prose>:first-child):not(:where([class~=not-prose] *)) { margin-top: 0; }
        .bp-ddw [data-kana]:after, .bp-ddw [data-kana]:before, .bp-ddw [data-term]:after, .bp-ddw [data-term]:before { border-bottom: 0; }
        .bp-text-shadow-reviewable-header { text-shadow: 0 0 BLACK; }
        .bp-writeup-body .writeup-examples--holder { gap: 14px; }
        #js-tour-learn-writeup p:last-of-type { margin-bottom: 0; }
        .writeup-examples--holder > li, #js-tour-learn-examples ul > div, #js-tour-learn-resources > ul > li > ul > li, #js-page-top > main > article > .w-full > .grid > section > article > ul > li { break-inside: avoid; }
        .caution > h4, .funfact > h4, #about, #synonyms, #antonyms, #examples, #online, #offline { break-after: avoid; }
        .border-rim, .border-primary-bg { border-color: black; }
        .bp-writeup-body > p, .bp-writeup-body > section > p { text-align: justify; }
        html { padding: 0; width: calc(210mm / ${scale}); }
        @page { size: A4; margin: 0.25in 0; }
    `;
    document.head.appendChild(style);

    Array.from(document.getElementsByClassName('bp-unblur-content-on-hover')).forEach(element => {
        element.classList.remove('bp-unblur-content-on-hover');
    });

    document.querySelectorAll('#js-page-top > main > article > .w-full > .grid > section').forEach(element => {
        element.classList.remove('grid', 'gap-16', 'border-b', 'p-24', 'md:rounded', 'md:border', 'border-rim', 'bg-secondary-bg');
    });

    Array.from(document.getElementsByClassName('md:text-subtitle')).forEach(element => {
        element.classList.remove('md:text-subtitle');
        element.classList.add('text-subtitle');
    });

    Array.from(document.getElementsByClassName('md:text-primary-fg')).forEach(element => {
        element.classList.remove('md:text-primary-fg');
        element.classList.add('text-primary-fg');
    });

    Array.from(document.getElementsByClassName('gp-popout')).forEach(element => {
        element.classList.remove('gp-popout', 'cursor-pointer');
    });

    const structrueAndDetailsRow = document.querySelector('#js-page-top > main > article > .w-full > .grid > .flex-col');
    if (structrueAndDetailsRow) {
        structrueAndDetailsRow.classList.remove('flex-col', 'md:flex-row', 'lg:flex-col', 'xl:flex-row');
        structrueAndDetailsRow.classList.add('flex-row');

        Array.from(structrueAndDetailsRow.children).forEach(element => {
            element.classList.remove('md:rounded', 'md:border');
            element.classList.add('rounded', 'border');
        });
    }

    const mainArticle = document.querySelector('article.bp-reviewable-root.pb-36');
    if (mainArticle) {
        mainArticle.classList.remove('pb-36');
    }

    deleteBySelector('#js-rev-header > .items-start > ul');
    deleteBySelector('#js-rev-header > .items-start a');

    const revHeader = document.getElementById('js-rev-header');
    if (revHeader) {
        revHeader.classList.remove('pb-48', 'pt-32');
        revHeader.classList.add('pb-24');

        const gapDiv = revHeader.querySelector('.gap-24');
        if (gapDiv) {
            gapDiv.classList.remove('gap-24');
        }

        const lessonInfoP = revHeader.querySelector('.items-start p.text-primary-contrast');
        const lessonDescriptionP = revHeader.querySelector('.items-start p.text-secondary-contrast');

        if (lessonDescriptionP) {
            const description = lessonDescriptionP.innerText;
            if (lessonInfoP) {
                lessonInfoP.innerText = description.includes(' Lesson ')
                    ? description.replace('Lesson ', 'L')
                    : lessonInfoP.innerText.replace('Lesson ', 'L');
            }

            lessonDescriptionP.remove();
        } else if (lessonInfoP) {
            lessonInfoP.innerText = lessonInfoP.innerText.replace('Lesson ', 'L');
        }

        const itemSpan = revHeader.querySelector('h1 > span.text-primary-accent > span');
        if (itemSpan) {
            itemSpan.classList.remove('text-reviewable-header-mobile', 'md:text-reviewable-header-desktop');
            itemSpan.classList.add('text-reviewable-header-desktop');

            const link = document.createElement('a');
            link.href = window.location.href;

            itemSpan.parentNode.replaceChild(link, itemSpan);
            link.appendChild(itemSpan);
        }

        const warningP = revHeader.querySelector('p.text-warning');
        if (warningP) {
            warningP.classList.add('mt-4');
        }
    }

    const mainSection = document.querySelector('#js-page-top > main > article > .w-full');
    if (mainSection) {
        mainSection.classList.remove('md:p-36');
        mainSection.classList.add('px-36');
    }

    const learnSection = document.getElementById('js-tour-learn-structure');
    const learnDetails = document.getElementById('js-tour-learn-details');
    if (learnSection) {
        const parent = learnSection.parentNode;
        parent.classList.remove('md:gap-16');
        parent.classList.add('gap-14');

        const buttons = learnSection.querySelectorAll('ul.inline-flex button');
        if (buttons.length === 2) {
            if (learnDetails) {
                learnDetails.classList.remove('flex-1');
                learnDetails.classList.add('flex-2');
            }

            const wFullDiv = learnSection.firstChild;
            const textP = wFullDiv.lastChild;

            if (wFullDiv && textP) {
                const columnsDiv = document.createElement('div');
                columnsDiv.className = 'grid grid-cols-2';

                const column1 = document.createElement('p');
                column1.className = 'bp-ddw prose';
                column1.setAttribute('data-force-furigana', 'default');

                const casualTitle = document.createElement('h4');
                casualTitle.classList.add('text-primary-accent');
                casualTitle.innerText = 'Casual';

                const formalTitle = document.createElement('h4');
                formalTitle.classList.add('text-primary-accent');
                formalTitle.innerText = 'Formal';

                const column2 = document.createElement('p');
                column2.className = 'bp-ddw prose';
                column2.setAttribute('data-force-furigana', 'default');

                buttons[0].click();
                setTimeout(() => {
                    column1.innerHTML = textP.innerHTML;
                    column1.prepend(casualTitle);
                    buttons[1].click();
                    setTimeout(() => {
                        column2.innerHTML = textP.innerHTML;
                        column2.prepend(formalTitle);
                        textP.remove();
                        columnsDiv.append(column1);
                        columnsDiv.append(column2);
                        wFullDiv.append(columnsDiv);
                        deleteBySelector('#structure > div');
                    }, 150);
                }, 150);
            }
        }
    }

    if (learnDetails && (learnDetails.children.length < 2 || learnDetails.children[1].innerHTML === '')) {
        learnDetails.remove();
    }

    const lessonInfo = document.querySelector('#js-rev-header > .flex');
    if (lessonInfo) {
        lessonInfo.classList.remove('flex');
        lessonInfo.classList.add('absolute', 'pl-36');
    }

    deleteBySelector('#about > div');

    const writeUpExamples = document.querySelectorAll('#js-tour-learn-writeup .bp-writeup-body .writeup-examples--holder');
    writeUpExamples.forEach(holder => {
        if (!holder.children.length) {
            return;
        }

        holder.querySelectorAll('ul').forEach(element => element.remove());
        if (holder.children.length > 1) {
            holder.classList.add('grid-cols-2');
            Array.from(holder.children).forEach(example => {
                if (example.classList.contains('writeup-example')) {
                    example.classList.add('flex', 'flex-col', 'border', 'justify-center', 'border-primary-bg', 'p-8');
                } else {
                    example.classList.add('flex', 'flex-col', 'items-stretch');
                    Array.from(example.children).forEach(div => {
                        div.classList.remove('relative', 'sm:p-24');
                        div.classList.add('flex-1', 'p-8', 'border');
                    });
                }
            });

            return;
        }

        const example = holder.children[0];
        if (example.classList.contains('writeup-example')) {
            example.classList.add('border', 'justify-center', 'border-primary-bg', 'p-8');
            return;
        }

        Array.from(example.children).forEach(div => {
            div.classList.remove('sm:p-24');
            div.classList.add('border', 'border-primary-bg', 'p-8');
        });
    });

    deleteBySelector('#js-page-top > main > article > .w-full > .grid > section > article > ul.grid > li > a.group .ml-4');
    deleteBySelector('#js-page-top > main > article > .w-full > .grid > section > .w-full');
    deleteBySelector('#js-page-top > main > article > .w-full > .grid > section ul.grid a.group p.text-tertiary-fg');

    const synAntSection = document.querySelector('#js-page-top > main > article > .w-full > .grid > section.gap-24');
    if (synAntSection) {
        synAntSection.classList.remove('gap-24');

        const grids = synAntSection.querySelectorAll('ul.gap-12');
        Array.from(grids).forEach(grid => {
            grid.classList.remove('gap-12', 'sm:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.add('gap-14', 'grid-cols-3');
        });

        const childrensCount = synAntSection.children.length;
        if (childrensCount > 1) {
            const synAntSectionClasses = synAntSection.className;
            for (let i = childrensCount - 1; i > 0; i--) {
                const newSection = document.createElement('section');
                newSection.className = synAntSectionClasses;

                const article = document.createElement('article');
                const children = synAntSection.children[i];
                article.innerHTML = children.innerHTML;

                newSection.appendChild(article);
                synAntSection.parentNode.insertBefore(newSection, synAntSection.nextSibling);
            }

            Array.from(synAntSection.children).forEach((element, index) => {
                if (index) {
                    element.remove();
                }
            });
        }
    }

    const linkBlocks = document.querySelectorAll('#js-page-top > main > article > .w-full > .grid > section > article > ul.grid > li > a.group > div');
    linkBlocks.forEach(linkBlock => {
        linkBlock.classList.remove('p-16');
        linkBlock.classList.add('border', 'border-primary-bg', 'p-8');
        linkBlock.querySelectorAll('p.text-detail.font-bold').forEach(p => p.classList.remove('font-bold'));
    });

    deleteBySelector('#js-page-top > main > article > .w-full > .grid > section ul.gap-12 a.group p.text-tertiary-fg');

    deleteById('self-study');
    deleteBySelector('#js-tour-learn-examples > .border-b');
    deleteBySelector('#js-tour-learn-examples > button');

    deleteBySelector('#js-tour-learn-examples > .relative > ul > li');
    deleteBySelector('#js-tour-learn-examples > .relative > ul ul');
    deleteBySelector('#js-tour-learn-examples > .relative > button');

    const examplesUl = document.querySelector('#js-tour-learn-examples > .relative > ul');
    if (examplesUl) {
        examplesUl.classList.remove('gap-16');
        examplesUl.classList.add('grid-cols-2', 'gap-14');

        const accentExample = examplesUl.querySelector('div.border-primary-accent');
        if (accentExample) {
            accentExample.classList.remove('border-primary-accent');
            accentExample.classList.add('border-primary-bg');
        }

        Array.from(examplesUl.children).forEach(example => {
            if (example.classList.contains('sm:p-24')) {
                example.classList.remove('sm:p-24');
                example.classList.add('p-8');
            }

            example.classList.add('border');
        });
    }

    deleteBySelector('#js-tour-learn-resources > ul > div');
    deleteBySelector('#js-tour-learn-resources > ul > .border-b');
    deleteBySelector('#js-tour-learn-resources button');
    deleteBySelector('#js-tour-learn-resources svg');
    const resources = document.querySelector('#js-tour-learn-resources > ul');
    if (resources) {
        resources.className = 'flex justify-center gap-14';

        Array.from(resources.children).forEach(element => {
            if (element.querySelector('.bp-fade-in-anim')) {
                element.remove();
                return;
            }

            element.classList.add('flex-1');
        });

        if (resources.children.length) {
            resources.querySelectorAll('ul.gap-24').forEach(element => {
                element.classList.remove('gap-24');
            });

            resources.querySelectorAll('li > .mb-24').forEach(element => {
                element.classList.remove('mb-24');
                element.classList.add('mb-4');
            })

            resources.querySelectorAll('li > ul > li > div').forEach(element => element.classList.add('pl-0'));
        } else {
            deleteById('js-tour-learn-resources');
        }
    }

    const gridExamplesContainers = document.querySelectorAll('#js-tour-learn-writeup .writeup-examples--holder, #js-tour-learn-examples > .relative > ul');

    function adjustExamplesLayoutForWidth(container) {
        Array.from(container.children).forEach((item) => {
            const textContainer = item.querySelector('.bp-ddw.prose, .japanese-holder');

            if (textContainer) {
                const currentWidth = textContainer.offsetWidth;
                textContainer.style.whiteSpace = 'nowrap';
                const singleLineWidth = textContainer.offsetWidth;
                textContainer.style.whiteSpace = '';

                if (singleLineWidth > currentWidth) {
                    item.classList.add('col-span-2');
                }
            }
        });

        const children = Array.from(container.children);
        let isFullWidth = children[0].classList.contains('col-span-2');
        let isSecondColumn = false;
        for (let i = 0; i < children.length - 1; i++) {
            const child = children[i];
            if (isFullWidth) {
                isFullWidth = children[i + 1].classList.contains('col-span-2');
                continue;
            }

            isFullWidth = children[i + 1].classList.contains('col-span-2');
            if (isFullWidth) {
                if (isSecondColumn) {
                    isSecondColumn = false;
                    continue;
                }

                child.classList.add('col-span-2');
                isSecondColumn = false;
            } else {
                isSecondColumn = !isSecondColumn;
            }
        }

        if (!isFullWidth && !isSecondColumn) {
            children[children.length - 1].classList.add('col-span-2');
        }
    }

    Array.from(document.getElementsByClassName('writeup-example--japanese')).forEach((element) => {
        element.classList.add('flex', 'justify-center');
        element.innerHTML = '<div class="block japanese-holder">' + element.innerHTML + '</div>';
    });

    gridExamplesContainers.forEach((container) => {
        adjustExamplesLayoutForWidth(container);
    });
}
