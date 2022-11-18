const colorThemes = document.querySelectorAll('[name="theme"]')

// store theme
const storeTheme = (theme) => {
    localStorage.setItem("theme", theme)  
}

// set theme
const setTheme = () => {
    const activeTheme = localStorage.getItem("theme")
    colorThemes.forEach(theme => {
        if (theme.id === activeTheme) {
            theme.checked = true
        } 
    })
    // fallback for no :has() support
    document.documentElement.className = theme
}

colorThemes.forEach(theme => {
    theme.addEventListener('click', () => {
        storeTheme(theme.id)
    })
})

document.onload = setTheme()