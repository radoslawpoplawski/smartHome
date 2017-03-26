<script type="text/x-template" id="main-section-template">
    <section class="mainSection">
        <div>zalogowany</div>
    </section>
</script>

<script type="text/javascript">
    (function(){
        Vue.component('main-section', {
            props: ['todo'],
            template: '#main-section-template'
        });
    })()
</script>
