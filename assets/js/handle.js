let lst_course_node = document.querySelector('.courses .lst_course')
let arrow_left_node = document.querySelector('.icon_custom_arow.left')
let arrow_right_node = document.querySelector('.icon_custom_arow.right')
let lst_testimial_node = document.querySelector('.lst_testimial')
let lst_blog_node = document.querySelector('.lst_blog')
let blog_toggle_icon_node = document.querySelector('.blog .toggle_icon')
let tab_bar_icon_node = document.querySelector('.tab_bar')

let intervalId = 0
let timeoutId = 0
let blogTimeoutId = 0

const app = {
    gapScroll: 0,
    maxValueOfScrollLeft: 0,
    timeShowStudent: 6000, //mls
    timeShowBlog: 1000, //mls
    random: function (max, lstExcept) {
        let isLoop = true
        let response = 0
        while (isLoop) {
            response = Math.floor(Math.random() * max);
            isLoop = lstExcept.includes(response)
        }
        return response
    },
    replaceActiveStudent: function (isRandom, newIndex = -1) {
        let indexItemActive = [...lst_testimial_node.children].findIndex((x) => x.className.includes('active'))
        if (indexItemActive != -1) {
            //Replace student
            lst_testimial_node.children[indexItemActive].classList.remove('active')
        }
        if (isRandom) {
            newIndex = app.random(lst_testimial_node.children.length, [indexItemActive])
        }
        lst_testimial_node.children[newIndex].classList.add('active')

        if (newIndex != -1) {
            //Replace icon
            let lst_testimial_toggle_icon_node = lst_testimial_node.children[newIndex].querySelector('.toggle_icon')
            let indexToggleIconActive = [...lst_testimial_toggle_icon_node.children].findIndex((x) => x.className.includes('active'))
            if (indexToggleIconActive != -1) {
                lst_testimial_toggle_icon_node.children[indexToggleIconActive].classList.remove('active')
            }
            lst_testimial_toggle_icon_node.children[newIndex].classList.add('active')
        }

    },
    randomActiveStudent: function () {
        intervalId = setInterval(app.replaceActiveStudent, app.timeShowStudent, true, -1)
        console.log('intervalId', intervalId)
    },
    addEvent: function () {
        //tab_bar
        tab_bar_icon_node.onclick = (event) => {
            if (event.target.nodeName == "A") {
                let icon_node_active_current = tab_bar_icon_node.querySelector('.active')
                if (icon_node_active_current != null) {
                    icon_node_active_current.classList.remove('active')
                }
                event.target.classList.add('active')
            }
        }
        // course
        arrow_left_node.onclick = (event) => {
            lst_course_node.scrollLeft -= this.gapScroll
            if (this.lstCourseScrollLeft < 0) {
                this.lstCourseScrollLeft = 0
            }
        }
        arrow_right_node.onclick = (event) => {
            lst_course_node.scrollLeft += this.gapScroll
            if (this.lstCourseScrollLeft > this.maxValueOfScrollLeft) {
                this.lstCourseScrollLeft = this.maxValueOfScrollLeft
            }
        }
        //testimnial
        lst_testimial_node.onclick = (event) => {
            console.log(event)
            if (event.target.classList.contains('icon_circle_custom')) {
                this.replaceActiveStudent(false, event.target.id)
                clearInterval(intervalId)
                console.log(('clearInterval'), intervalId)
                clearTimeout(timeoutId)
                console.log(('clearTimeOut'), timeoutId)
                timeoutId = setTimeout(this.randomActiveStudent, this.timeShowStudent)
                console.log('TimeOut', timeoutId)
            }
        }
        //blog
        blog_toggle_icon_node.onclick = (event) => {
            if (event.target.classList.contains('icon_circle_custom')) {
                if (!lst_blog_node.classList.contains('active')) {
                    lst_blog_node.classList.add('active')
                }
                blogTimeoutId = setTimeout(() => {
                    lst_blog_node.classList.remove('active')
                    //Replace active icon
                    let iconActive = blog_toggle_icon_node.querySelector('.active')
                    if (iconActive != null) {
                        iconActive.classList.remove('active')
                    }
                    event.target.classList.add('active')
                    clearTimeout(blogTimeoutId)
                    console.log('clearTimeoutBlog', blogTimeoutId)
                }, this.timeShowBlog)
                console.log('blogTimeoutId', blogTimeoutId)
            }
        }
    },
    config: function () {
        this.gapScroll = 370,
            this.maxValueOfScrollLeft = lst_course_node.scrollWidth - lst_course_node.clientWidth
    },
    init: function () {
        this.config()
        this.addEvent()
        this.randomActiveStudent()
    }
}

app.init()