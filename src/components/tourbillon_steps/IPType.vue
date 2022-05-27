<template>
    <div>
        <h5>Basic</h5>
        <MultiSelect v-model="selectedCities1" :options="cities" optionLabel="name" placeholder="Select Cities" />

        <h5>Chips</h5>
        <MultiSelect v-model="selectedCities2" :options="cities" optionLabel="name" placeholder="Select Cities" display="chip" />

        <h5>Grouped</h5>
        <MultiSelect v-model="selectedGroupedCities" :options="groupedCities" optionLabel="label"  optionGroupLabel="label" optionGroupChildren="items" placeholder="Select Cities">
            <template #optiongroup="slotProps">
                <div class="flex align-items-center country-item">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" width="18" />
                    <div>{{slotProps.option.label}}</div>
                </div>
            </template>
        </MultiSelect>

        <h5>Advanced with Templating and Filtering</h5>
        <MultiSelect v-model="selectedCountries" :options="countries" optionLabel="name" placeholder="Select Countries" :filter="true" class="multiselect-custom">
            <template #value="slotProps">
                <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.code">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" width="18" />
                    <div>{{option.name}}</div>
                </div>
                <template v-if="!slotProps.value || slotProps.value.length === 0">
                    Select Countries
                </template>
            </template>
            <template #option="slotProps">
                <div class="country-item">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" width="18" />
                    <div>{{slotProps.option.name}}</div>
                </div>
            </template>
        </MultiSelect>

        <h5>Loading State</h5>
        <MultiSelect placeholder="Loading..." loading></MultiSelect>

        <h5>Virtual Scroll (1000 Items)</h5>
        <MultiSelect v-model="selectedItems" :options="items" :maxSelectedLabels="3" :selectAll="selectAll" @selectall-change="onSelectAllChange($event)" @change="onChange($event)" optionLabel="label" optionValue="value" :virtualScrollerOptions="{ itemSize: 44 }" placeholder="Select Item" />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const selectedCities1 = ref();
        const selectedCities2 = ref();
        const selectedCountries = ref();
        const selectedGroupedCities = ref();
        const selectedItems = ref();
        const selectAll = ref(false);
        const cities = ref([
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ]);
        const countries = ref([
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ]);
        const groupedCities = ref([
            {
                label: 'Germany', code: 'DE',
                items: [
                    {label: 'Berlin', value: 'Berlin'},
                    {label: 'Frankfurt', value: 'Frankfurt'},
                    {label: 'Hamburg', value: 'Hamburg'},
                    {label: 'Munich', value: 'Munich'}
                ]
            },
            {
                label: 'USA', code: 'US',
                items: [
                    {label: 'Chicago', value: 'Chicago'},
                    {label: 'Los Angeles', value: 'Los Angeles'},
                    {label: 'New York', value: 'New York'},
                    {label: 'San Francisco', value: 'San Francisco'}
                ]
            },
            {
                label: 'Japan', code: 'JP',
                items: [
                    {label: 'Kyoto', value: 'Kyoto'},
                    {label: 'Osaka', value: 'Osaka'},
                    {label: 'Tokyo', value: 'Tokyo'},
                    {label: 'Yokohama', value: 'Yokohama'}
                ]
            }
        ]);
        const items = Array.from({ length: 1000 }, (_, i) => ({ label: `Item #${i}`, value: i }))

        return { selectedCities1, selectedCities2, selectedCountries, selectedGroupedCities, cities, countries, groupedCities, items, selectedItems, selectAll }
    },
    methods: {
        onSelectAllChange(event) {
            this.selectedItems = event.checked ? this.items.map((item) => item.value) : [];
            this.selectAll = event.checked;
        },
        onChange(event) {
            this.selectAll = event.value.length === this.items.length
        }
    }
}
</script>

<style lang="scss" scoped>
.p-multiselect {
    width: 60rem;
}

::v-deep(.multiselect-custom) {
    .p-multiselect-label:not(.p-placeholder) {
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);

        img.flag {
            width: 17px;
        }
    }
}

@media screen and (max-width: 640px) {
    .p-multiselect {
        width: 100%;
    }
}
</style>