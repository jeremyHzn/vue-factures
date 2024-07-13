<template>
  <div>
    <div class="client" v-if="!loading && client">
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Créer un client
          </h1>
          <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
        </div>
        <div v-if="!isNewClient" class="col text-end">
          <button @click="onDeleteClient(client)" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />
            Supprimer le client
          </button>
        </div>
      </div>

      <div class="alert alert-danger my-3" v-if="error">Un champ requière votre attention</div>
      <h2>Contact</h2>
      <div class="row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="client.firstName"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstName" class="form-label">Prénom</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              v-model="client.lastName"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="function"
              id="function"
              v-model="client.function"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.function }"
            />
            <label for="function" class="form-label">Fonction</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="tel"
              id="tel"
              v-model="client.tel"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.tel }"
            />
            <label for="tel" class="form-label">Téléphone</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="email"
              id="email"
              v-model="client.email"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.email }"
            />
            <label for="email" class="form-label">Email</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="companyName"
              id="companyName"
              v-model="client.companyName"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.companyName }"
            />
            <label for="companyName" class="form-label">Entreprise</label>
          </div>
        </div>
      </div>
      <h2>Coordonnée</h2>
      <div class="row">
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="addr1"
              id="addr1"
              v-model="client.addr1"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.addr1 }"
            />
            <label for="addr1" class="form-label">Adresse 1</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="addr2"
              id="addr2"
              v-model="client.addr2"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.addr2 }"
            />
            <label for="addr2" class="form-label">Adresse 2</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="zip"
              id="zip"
              v-model="client.zip"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.zip }"
            />
            <label for="zip" class="form-label">Code postal</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="city"
              id="city"
              v-model="client.city"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.city }"
            />
            <label for="city" class="form-label">Ville</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="country"
              id="country"
              v-model="client.country"
              class="form-control"
              placeholder="Facture N°"
              :class="{ 'is-invalid': !client.country }"
            />
            <label for="country" class="form-label">Pays</label>
          </div>
        </div>

      </div>
      <p class="text-end">
        <button
          @click="onSave()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>

      <AppDebug :datas="client" />
    </div>
    <div v-else>loading...</div>
  </div>

</template>

<script>
import { useClientStore } from '@/stores/client'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default {
  components: {
    
  },
  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      
      error: false
    }
  },
  mounted() {
    // avant de monter le composant de la vue, on charge les données de la client à éditer
    this.setClient(this.id)
  },
  computed: {
    ...mapState(useClientStore, {
      loading: 'loading'
    }),
    // le formulaire local 'client' est mappé sur la donnée du store 'item'
    // attention, pour pouvoir modifier les données d'un état du store (stae), il faut utiliser mpaWritableState plutôt que mapState (qui est pour la lecture seule)
    // le formulaire local 'bill' est mappé sur la donnée du store 'item'
    // attention, pour pouvoir modifier les données d'un état du store (stae), il faut utiliser mpaWritableState plutôt que mapState (qui est pour la lecture seule)
    ...mapWritableState(useClientStore, {
      client: 'item'
    }),
    // ici on a un computed classique
    isNewClient() {
      return this.id === 'new'
    },

    formInvalid() {
      return (
        !this.client ||
        !this.client.firstName ||
        !this.client.companyName ||
        !this.client.addr1 ||
        !this.client.zip ||
        !this.client.city ||
        !this.client.country
      )
    },
    totalRow() {
      return (index) => {
        if (this.client) {
          const prestation = this.client.prestations[index]
          return prestation.qty * prestation.price
        }
      }
    }
  },
  methods: {
    // pour pouvoir appeler un action du store, il faut l'importer et ici on lui donne un nom local différent 'setClient'
    ...mapActions(useClientStore, {
      setClient: 'setItem',
      updateClient: 'updateItem',
      createClient: 'createItem',
      deleteClient: 'deleteItem'
    }),


    onDeleteClient() {
      this.deleteClient(this.id)
      this.$router.push({ name: 'clients' })
    },
    onSave() {
      // si j'ai un erreur dans le formulaire
      if (this.formInvalid) {
        // gestion des erreurs ici
        this.error = true
      } else {
        this.error = false
        // on appelle la méthode de sauvegarde de la donnée du store
        if (this.isNewClient) {
          this.createClient(this.client)
        } else {
          this.updateClient(this.client)
        }
        // on revient sur la page précédente
        this.$router.push({ name: 'clients' })
      }
    }
  },

}
</script>
